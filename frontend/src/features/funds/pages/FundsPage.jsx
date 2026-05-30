import {
  useEffect,
  useState
} from "react";

import {
  getFunds
} from "../api/getFunds";

import FundsGrid
from "../components/FundsGrid";

import {
  useNavigate
} from "react-router-dom";
import {
  Plus
} from "lucide-react";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import ErrorState from "../../../shared/components/states/ErrorState";
import {
  CardSkeleton
} from "../../../shared/components/states/Skeleton";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function FundsPage() {

  const [funds, setFunds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const navigate = useNavigate();

    const toast =
      useToast();

  useEffect(() => {

    async function fetchFunds() {

      try {

        const response =
          await getFunds();

        setFunds(response);

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to fetch funds"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchFunds();

  }, [toast]);

  if (loading) {

    return (

      <FundsSkeleton />
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

      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Funds
          </h1>

          <p className="text-gray-500 mt-1">
            Track entrusted money
          </p>

        </div>

        <button
        onClick={() =>
            navigate("/funds/create")
          }
          className="
            bg-black
            text-white
            px-5 py-3
            rounded-2xl
            inline-flex items-center gap-2
          "
        >
          <Plus size={18} />
          Create Fund
        </button>

      </div>

      {error && (
        <div className="mb-6">
          <ErrorState
            title="Failed to fetch funds"
            description={error}
            compact
          />
        </div>
      )}

      <FundsGrid
        funds={funds}
        onCreateFund={() => navigate("/funds/create")}
      />

    </div>
  );
}

function FundsSkeleton() {

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-9 w-32 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-5 w-40 animate-pulse rounded-xl bg-slate-200" />
        </div>
        <div className="h-12 w-36 animate-pulse rounded-2xl bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} lines={4} />
        ))}
      </div>
    </div>
  );
}

export default FundsPage;
