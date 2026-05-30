import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import ExpenseForm
from "../components/ExpenseForm";

import {
  getExpenseById
} from "../api/getExpenseById";

import {
  updateExpense
} from "../api/updateExpense";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import ErrorState from "../../../shared/components/states/ErrorState";
import LoadingPage from "../../../shared/components/states/LoadingPage";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function EditExpensePage() {

  const { expenseId } = useParams();

  const navigate = useNavigate();

  const [expense, setExpense] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const toast =
    useToast();

  useEffect(() => {

    async function fetchExpense() {

      try {

        const data =
          await getExpenseById(expenseId);

        setExpense({

          amount: data.amount,

          date: data.date,

          categoryId:
            data.categoryId ||

            data.category?.id,

          ownerType: data.ownerType,

          ownerName: data.ownerName,

          description: data.description
        });

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to fetch expense"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchExpense();

  }, [expenseId, toast]);

  async function handleUpdate(
    formData
  ) {

    try {

      setSubmitting(true);
      setError("");

      await updateExpense(
        expenseId,
        formData
      );

      toast.success("Expense updated successfully");

      navigate("/expenses");

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const message =
        getFriendlyErrorMessage(
          error,
          "Failed to update expense"
        );

      setError(message);
      toast.error(message);
    } finally {

      setSubmitting(false);
    }
  }

  if (loading) {

    return (

      <LoadingPage label="Loading expense..." />
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

      <div className="max-w-2xl mx-auto">

        <h1
          className="
            text-3xl
            font-bold
            mb-2
          "
        >
          Edit Expense
        </h1>

        <p
          className="
            text-gray-500
            mb-8
          "
        >
          Update your expense
        </p>

        {error && (
          <div className="mb-6">
            <ErrorState
              title="Expense could not be loaded"
              description={error}
              compact
            />
          </div>
        )}

        {expense && (
          <ExpenseForm
            initialData={expense}
            onSubmit={handleUpdate}
            buttonText="Update Expense"
            loading={submitting}
            loadingText="Updating Expense..."
          />
        )}

      </div>

    </div>
  );
}

export default EditExpensePage;
