import {
  useEffect,
  useCallback,
  useState
} from "react";
import { getExpenses } from "../api/getExpenses";
import { getFilteredExpenses } from "../api/getFilteredExpenses";
import { useNavigate } from "react-router-dom";
import { deleteExpense }
from "../api/deleteExpense";
import DateRangeCalendar
from "./DateRangeCalendar";
import {
  Pencil,
  Trash2,
  Calendar,
  Plus,
  ReceiptText,
  X,
  UtensilsCrossed,
  Plane,
  ShoppingBag,
  HeartPulse,
  Film,
  Circle
} from "lucide-react";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import EmptyState from "../../../shared/components/states/EmptyState";
import ErrorState from "../../../shared/components/states/ErrorState";
import Spinner from "../../../shared/components/states/Spinner";
import {
  TableSkeleton
} from "../../../shared/components/states/Skeleton";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

const dateFilterOptions = [
  {
    label: "Today",
    value: "TODAY"
  },
  {
    label: "Last 7 Days",
    value: "LAST_7_DAYS"
  },
  {
    label: "Last 30 Days",
    value: "LAST_30_DAYS"
  },
  {
    label: "Custom Range",
    value: "CUSTOM"
  }
];

function ExpenseTable() {

  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] =
    useState(0);

  const [activeFilter, setActiveFilter] =
    useState("");

  const [isCalendarOpen, setIsCalendarOpen] =
    useState(false);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [isFiltering, setIsFiltering] =
    useState(false);

  const [filterError, setFilterError] =
    useState("");

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [pageLoading, setPageLoading] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [deletingExpenseId, setDeletingExpenseId] =
    useState(null);

  const navigate = useNavigate();

  const toast =
    useToast();

  const fetchExpenses = useCallback(async function fetchExpenses(
    page = 0,
    initial = false
  ) {

    if (initial) {
      setInitialLoading(true);
    } else {
      setPageLoading(true);
    }

    setLoadError("");

    try {

      const response = await getExpenses(page);

      setExpenses(response.expenses || []);

      setPagination(response.pagination || {});

      setCurrentPage(
        response.pagination?.page ?? page
      );

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const message =
        getFriendlyErrorMessage(
          error,
          "Failed to fetch expenses"
        );

      setLoadError(message);
      toast.error(message);

    } finally {

      if (initial) {
        setInitialLoading(false);
      } else {
        setPageLoading(false);
      }

    }
  }, [toast]);

  useEffect(() => {

    async function fetchInitialExpenses() {

      await fetchExpenses(0, true);
    }

    fetchInitialExpenses();

  }, [fetchExpenses]);

  async function applyDateFilter({
    range,
    nextStartDate = "",
    nextEndDate = ""
  }) {

    setIsFiltering(true);
    setFilterError("");

    try {

      const filteredExpenses =
        await getFilteredExpenses({
          range,
          startDate: nextStartDate,
          endDate: nextEndDate
        });

      setExpenses(filteredExpenses || []);

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const message =
        getFriendlyErrorMessage(
          error,
          "Could not load filtered expenses."
        );

      setFilterError(message);
      toast.error(message);

    } finally {

      setIsFiltering(false);
    }
  }

  async function handleFilterChange(event) {

    const selectedFilter =
      event.target.value;

    setActiveFilter(selectedFilter);
    setFilterError("");

    if (!selectedFilter) {

      setIsCalendarOpen(false);
      setStartDate("");
      setEndDate("");
      await fetchExpenses(0);

      return;
    }

    if (selectedFilter === "CUSTOM") {

      setStartDate("");
      setEndDate("");
      setIsCalendarOpen(true);

      return;
    }

    setIsCalendarOpen(false);
    setStartDate("");
    setEndDate("");

    await applyDateFilter({
      range: selectedFilter
    });
  }

  async function handleCustomRangeChange(
    nextStartDate,
    nextEndDate
  ) {

    setStartDate(nextStartDate);
    setEndDate(nextEndDate);

    if (nextStartDate && nextEndDate) {

      setIsCalendarOpen(false);

      await applyDateFilter({
        range: "CUSTOM",
        nextStartDate,
        nextEndDate
      });
    }
  }

  async function clearDateFilter() {

    setActiveFilter("");
    setIsCalendarOpen(false);
    setStartDate("");
    setEndDate("");
    setFilterError("");

    await fetchExpenses(0);
  }

  async function goToPreviousPage() {

    if (
      activeFilter ||
      !pagination.hasPrevious ||
      pageLoading
    ) {

      return;
    }

    await fetchExpenses(
      Math.max(currentPage - 1, 0)
    );
  }

  async function goToNextPage() {

    if (
      activeFilter ||
      !pagination.hasNext ||
      pageLoading
    ) {

      return;
    }

    await fetchExpenses(
      currentPage + 1
    );
  }

  const selectedFilterLabel =
    dateFilterOptions.find(
      (option) => option.value === activeFilter
    )?.label;

  const isDateFilterActive =
    Boolean(activeFilter);

  const totalPages =
    pagination.totalPages ?? 1;

  const hasPreviousPage =
    Boolean(pagination.hasPrevious);

  const hasNextPage =
    Boolean(pagination.hasNext);

  const isTableLoading =
    initialLoading ||
    pageLoading ||
    isFiltering;

  const getCategoryConfig = (category) => {

    const normalizedCategory =
      category?.toLowerCase();

    switch (normalizedCategory) {

      case "food":
        return {
          icon: UtensilsCrossed,
          className: "bg-red-50 text-red-600 border-red-100"
        };

      case "travel":
        return {
          icon: Plane,
          className: "bg-blue-50 text-blue-600 border-blue-100"
        };

      case "shopping":
        return {
          icon: ShoppingBag,
          className: "bg-purple-50 text-purple-600 border-purple-100"
        };

      case "health":
        return {
          icon: HeartPulse,
          className: "bg-emerald-50 text-emerald-600 border-emerald-100"
        };

      case "entertainment":
        return {
          icon: Film,
          className: "bg-amber-50 text-amber-600 border-amber-100"
        };

      default:
        return {
          icon: Circle,
          className: "bg-gray-50 text-gray-600 border-gray-100"
        };
    }
  };

  async function handleDelete(
  expenseId
) {

  const confirmed =
    window.confirm(
      "Delete this expense?"
    );

  if (!confirmed) {
    return;
  }

  try {

    setDeletingExpenseId(expenseId);

    await deleteExpense(
      expenseId
    );

    setExpenses((prev) =>

      prev.filter(

        (expense) =>

          expense.expenseId !== expenseId
      )
    );

    toast.success("Expense deleted successfully");

  } catch (error) {

    console.error(error);

    if (isUnauthorizedError(error)) {
      handleSessionExpired(toast);
      return;
    }

    toast.error(
      getFriendlyErrorMessage(
        error,
        "Failed to delete expense"
      )
    );
  } finally {

    setDeletingExpenseId(null);
  }
}

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Expenses
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Track and manage your expenses
          </p>

        </div>

        <button
  onClick={() => navigate("/expenses/create")}
  className="
    flex items-center gap-2
    bg-green-600 hover:bg-green-700
    text-white
    px-4 py-2
    rounded-xl
    transition
  "
>
  <Plus size={16} />
  Add Expense
</button>

      </div>

      {/* Date Filters */}

      <div className="flex items-center justify-end mb-6">

        <div className="relative flex items-center gap-3">

          <div
            className="
              flex items-center gap-2
              border border-gray-200
              rounded-xl
              bg-white
              px-3 py-2
              text-gray-600
              shadow-sm
            "
          >
            <Calendar size={16} />

            <select
              value={activeFilter}
              onChange={handleFilterChange}
              disabled={isTableLoading}
              className="
                bg-transparent
                outline-none
                text-sm
                font-medium
                text-gray-700
                disabled:cursor-not-allowed
                disabled:text-gray-400
              "
            >
              <option value="">
                Date filter
              </option>

              {dateFilterOptions.map((option) => (

                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}

            </select>

          </div>

          {activeFilter && (

            <button
              type="button"
              onClick={clearDateFilter}
              disabled={isTableLoading}
              className="
                flex items-center gap-2
                rounded-xl
                border border-gray-200
                px-3 py-2
                text-sm
                font-medium
                text-gray-500
                hover:bg-gray-50
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={15} />
              Clear
            </button>
          )}

          {isCalendarOpen && (

            <DateRangeCalendar
              startDate={startDate}
              endDate={endDate}
              onRangeChange={handleCustomRangeChange}
            />
          )}

        </div>

      </div>

      {(isFiltering || filterError || isDateFilterActive) && (

        <div className="mb-5 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            {isFiltering
              ? "Filtering expenses..."
              : filterError || (
                activeFilter === "CUSTOM" && endDate
                  ? `Showing expenses from ${startDate} to ${endDate}`
                  : activeFilter === "CUSTOM" && startDate
                    ? `Start date selected: ${startDate}`
                    : `Showing ${selectedFilterLabel?.toLowerCase()} transactions`
              )}
          </p>

        </div>
      )}

      {loadError && (
        <div className="mb-5">
          <ErrorState
            title="Failed to fetch expenses"
            description={loadError}
            compact
          />
        </div>
      )}

      {/* Table */}

      <div className="overflow-x-auto">

        {isTableLoading ? (

          <TableSkeleton rows={5} columns={6} />

        ) : (

        <table className="w-full border-separate border-spacing-y-2">

          <thead>

            <tr
              className="
                text-left
                text-gray-500
                text-sm
                border-b border-gray-100
              "
            >

              <th className="pb-4 font-medium">
                Date
              </th>

              <th className="pb-4 font-medium">
                Description
              </th>

              <th className="pb-4 font-medium">
                Category
              </th>

              <th className="pb-4 font-medium">
                Amount
              </th>

              <th className="pb-4 font-medium">
                Owner
              </th>

              <th className="pb-4 font-medium text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="
                    rounded-2xl
                    bg-gray-50
                    py-14
                    text-center
                    text-sm
                    font-medium
                    text-gray-500
                  "
                >
                  <EmptyState
                    icon={ReceiptText}
                    title={
                      isDateFilterActive
                        ? "No filtered results"
                        : "No expenses found"
                    }
                    description={
                      isDateFilterActive
                        ? "Try adjusting the selected date range."
                        : "Start tracking your spending activity."
                    }
                    compact
                  />
                </td>

              </tr>
            )}

            {expenses.map((expense) => (

              <tr
                key={expense.expenseId}
                className="
                  bg-white
                  shadow-sm shadow-gray-100/70
                  hover:bg-gray-50/80
                  hover:shadow-md hover:shadow-gray-100
                  transition
                "
              >

                <td className="rounded-l-2xl py-5 pl-4 text-sm text-gray-600">
                  {expense.date}
                </td>

                <td className="py-5">

                  <div>

                    <p className="font-medium text-gray-800">
                      {expense.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Expense ID: {expense.expenseId}
                    </p>

                  </div>

                </td>

                <td className="py-5">

                  {(() => {

                    const categoryConfig =
                      getCategoryConfig(expense.category);

                    const CategoryIcon =
                      categoryConfig.icon;

                    return (

                      <span
                        className={`
                          inline-flex items-center gap-2
                          rounded-full
                          border
                          px-3 py-1.5
                          text-xs
                          font-semibold
                          ${categoryConfig.className}
                        `}
                      >
                        <CategoryIcon size={13} />
                        {expense.category}
                      </span>
                    );
                  })()}

                </td>

                <td
                  className="
                    py-5
                    font-semibold
                    text-red-500
                  "
                >
                  ₹{expense.amount}
                </td>

                <td className="py-5">

                  <span
                    className="
                      bg-gray-100
                      text-gray-700
                      text-xs
                      px-3 py-1
                      rounded-full
                    "
                  >
                    {expense.ownerType}
                  </span>

                </td>

                <td className="rounded-r-2xl py-5 pr-4">

                  <div
                    className="
                      flex items-center
                      justify-center
                      gap-3
                    "
                  >

                    <button
                    onClick={() =>
                    navigate(
                       `/expenses/edit/${expense.expenseId}`
                        )
         }
                      className="
                        p-2
                        rounded-lg
                        bg-gray-100
                        hover:bg-gray-200
                        transition
                      "
                      aria-label="Edit expense"
                    >
                      <Pencil
                        size={16}
                        className="text-gray-600"
                      />
                    </button>

                    <button
                    onClick={() =>
                        handleDelete(
                          expense.expenseId
                        )
                      }
                      disabled={deletingExpenseId === expense.expenseId}
                      className="
                        p-2
                        rounded-lg
                        bg-red-100
                        hover:bg-red-200
                        transition
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                      aria-label="Delete expense"
                    >
                      {deletingExpenseId === expense.expenseId ? (
                        <Spinner className="size-4 text-red-500" />
                      ) : (
                        <Trash2
                          size={16}
                          className="text-red-500"
                        />
                      )}
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        )}

      </div>

      {/* Pagination */}

      {!isDateFilterActive && (

        <div
          className="
            flex items-center
            justify-between
            mt-6
          "
        >

          <p className="text-sm text-gray-500">

            Showing page{" "}

            <span className="font-medium text-gray-700">
              {currentPage + 1}
            </span>

            {" "}of{" "}

            <span className="font-medium text-gray-700">
              {totalPages}
            </span>

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={!hasPreviousPage || pageLoading}
              className={`
                px-4 py-2
                rounded-xl
                text-sm
                border

                ${
                  hasPreviousPage
                    ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "border-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
            >
              {pageLoading ? "Fetching..." : "Previous"}
            </button>

            <button
              className="
                px-4 py-2
                bg-green-600
                text-white
                rounded-xl
                text-sm
              "
            >
              {currentPage + 1}
            </button>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={!hasNextPage || pageLoading}
              className={`
                px-4 py-2
                rounded-xl
                text-sm
                border

                ${
                  hasNextPage
                    ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "border-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
            >
              {pageLoading ? "Fetching..." : "Next"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ExpenseTable;
