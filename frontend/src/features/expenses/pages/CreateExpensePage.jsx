import {
  useState
} from "react";
import { useNavigate } from "react-router-dom";

import ExpenseForm from "../components/ExpenseForm";

import { createExpense } from "../api/createExpense";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import ErrorState from "../../../shared/components/states/ErrorState";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function CreateExpensePage() {

  const navigate = useNavigate();

  const toast =
    useToast();

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleCreateExpense(formData) {

    try {

      setSubmitting(true);
      setError("");

      await createExpense(formData);

      toast.success("Expense created successfully");

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
          "Failed to create expense"
        );

      setError(message);
      toast.error(message);
    } finally {

      setSubmitting(false);
    }
  }

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Create Expense
        </h1>

        <p className="text-gray-500 mb-8">
          Add a new expense
        </p>

        {error && (
          <div className="mb-6">
            <ErrorState
              title="Failed to create expense"
              description={error}
              compact
            />
          </div>
        )}

        <ExpenseForm
          onSubmit={handleCreateExpense}
          loading={submitting}
          loadingText="Creating Expense..."
        />

      </div>

    </div>
  );
}

export default CreateExpensePage;
