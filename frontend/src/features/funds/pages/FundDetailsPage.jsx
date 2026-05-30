import {

  useEffect,

  useState

} from "react";

import {

  useParams

} from "react-router-dom";

import {

  getFundById

} from "../api/getFundById";

import {

  getFundExpenses

} from "../api/getFundExpenses";
import {
  ReceiptText
} from "lucide-react";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import EmptyState from "../../../shared/components/states/EmptyState";
import ErrorState from "../../../shared/components/states/ErrorState";
import LoadingPage from "../../../shared/components/states/LoadingPage";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function FundDetailsPage() {

  const { fundId } =
    useParams();

  const [fund, setFund] =
    useState(null);

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const toast =
    useToast();

  useEffect(() => {

    async function fetchData() {

      try {

        const fundResponse =
          await getFundById(
            fundId
          );

        const expenseResponse =
          await getFundExpenses(
            fundId
          );

        setFund(fundResponse);

        setExpenses(expenseResponse);

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to load fund details"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchData();

  }, [fundId, toast]);

  if (loading) {

    return (
      <LoadingPage label="Fetching fund details..." />
    );
  }

  if (error || !fund) {

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <ErrorState
          title="Failed to load fund details"
          description={error || "Something went wrong"}
        />
      </div>
    );
  }

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
        p-8
      "
    >

      {/* FUND CARD */}

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border border-gray-100
          mb-8
        "
      >

        <div
          className="
            flex
            justify-between
            items-start
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                mb-2
              "
            >
              {fund.ownerName}
            </h1>

            <p className="text-gray-500">
              Fund Details
            </p>

          </div>

          <span
            className="
              px-4 py-2
              rounded-full
              bg-green-100
              text-green-700
              text-sm
              font-medium
            "
          >
            {fund.status}
          </span>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-8
          "
        >

          <div>

            <p className="text-gray-400 text-sm">
              Amount Received
            </p>

            <h2
              className="
                text-2xl
                font-bold
                mt-1
              "
            >
              ₹{fund.amountReceived}
            </h2>

          </div>

          <div>

            <p className="text-gray-400 text-sm">
              Remaining Amount
            </p>

            <h2
              className="
                text-2xl
                font-bold
                mt-1
              "
            >
              ₹{fund.remainingAmount}
            </h2>

          </div>

          <div>

            <p className="text-gray-400 text-sm">
              Given Date
            </p>

            <h2
              className="
                text-lg
                font-semibold
                mt-1
              "
            >
              {fund.givenDate}
            </h2>

          </div>

        </div>

      </div>

      {/* EXPENSES TABLE */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          border border-gray-100
          overflow-hidden
        "
      >

        <div className="p-6 border-b">

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Fund Expenses
          </h2>

        </div>

        <table className="w-full">

          <thead
            className="
              bg-gray-50
              text-left
            "
          >

            <tr>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Description
              </th>

              <th className="px-6 py-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 && (

              <tr>

                <td
                  colSpan="4"
                  className="px-6 py-8"
                >
                  <EmptyState
                    icon={ReceiptText}
                    title="No expenses found"
                    description="Transactions linked to this fund will appear here."
                    compact
                  />
                </td>

              </tr>
            )}

            {expenses.map((expense) => (

              <tr
                key={expense.expenseId}
                className="
                  border-t
                "
              >

                <td className="px-6 py-4">
                  ₹{expense.amount}
                </td>

                <td className="px-6 py-4">
                  {expense.category}
                </td>

                <td className="px-6 py-4">
                  {expense.description}
                </td>

                <td className="px-6 py-4">
                  {expense.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FundDetailsPage;
