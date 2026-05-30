import {
  useState
} from "react";
import {
  useNavigate
} from "react-router-dom";

import FundForm
from "../components/FundForm";

import {
  createFund
} from "../api/createFund";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import ErrorState from "../../../shared/components/states/ErrorState";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function CreateFundPage() {

  const navigate =
    useNavigate();

  const toast =
    useToast();

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleCreate(
    formData
  ) {

    try {

      setSubmitting(true);
      setError("");

      await createFund(
        formData
      );

      toast.success("Fund created successfully");

      navigate("/funds");

    } catch (error) {

  if (isUnauthorizedError(error)) {
    handleSessionExpired(toast);
    return;
  }

  const message =
    getFriendlyErrorMessage(
      error,
      "Failed to create fund"
    );

  setError(message);
  toast.error(message);

  console.error(error);
} finally {

  setSubmitting(false);
}
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
          Create Fund
        </h1>

        <p
          className="
            text-gray-500
            mb-8
          "
        >
          Track entrusted money
        </p>

        {error && (
          <div className="mb-6">
            <ErrorState
              title="Failed to create fund"
              description={error}
              compact
            />
          </div>
        )}

        <FundForm
          onSubmit={handleCreate}
          loading={submitting}
          loadingText="Creating Fund..."
        />

      </div>

    </div>
  );
}

export default CreateFundPage;
