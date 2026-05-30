import {

  useEffect,

  useState

} from "react";

import {

  useNavigate,

  useParams

} from "react-router-dom";

import FundForm
from "../components/FundForm";

import {
  getFundById
} from "../api/getFundById";

import {
  updateFund
} from "../api/updateFund";
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

function EditFundPage() {

  const { fundId } =
    useParams();

  const navigate =
    useNavigate();

  const [fund, setFund] =
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

    async function fetchFund() {

      try {

        const response =
          await getFundById(
            fundId
          );

        setFund(response);

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to fetch fund"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchFund();

  }, [fundId, toast]);

  async function handleUpdate(
    formData
  ) {

    try {

      setSubmitting(true);
      setError("");

      await updateFund(

        fundId,

        formData
      );

      toast.success("Fund updated successfully");

      navigate("/funds");

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const message =
        getFriendlyErrorMessage(
          error,
          "Failed to update fund"
        );

      setError(message);
      toast.error(message);
    } finally {

      setSubmitting(false);
    }
  }

  if (loading) {

    return (
      <LoadingPage label="Loading fund..." />
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
          Edit Fund
        </h1>

        <p
          className="
            text-gray-500
            mb-8
          "
        >
          Update fund details
        </p>

        {error && (
          <div className="mb-6">
            <ErrorState
              title="Fund could not be loaded"
              description={error}
              compact
            />
          </div>
        )}

        {fund && (
        <FundForm

          initialData={fund}

          onSubmit={handleUpdate}

          buttonText="Update Fund"

          loading={submitting}

          loadingText="Updating Fund..."
        />
        )}

      </div>

    </div>
  );
}

export default EditFundPage;
