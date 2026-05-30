import {
  useEffect,
  useState
} from "react";

import {
  getCategoryTotals
} from "../api/getCategoryTotals";

import {
  getMonthlyAnalytics
} from "../api/getMonthlyAnalytics";

import {
  getWeeklyAnalytics
} from "../api/getWeeklyAnalytics";

import {
  getFundUtilization
} from "../api/getFundUtilization";

import AnalyticsStats
from "../components/AnalyticsStats";

import CategoryPieChart
from "../components/CategoryPieChart";

import FundUtilization
from "../components/FundUtilization";

import MonthlyTrendChart
from "../components/MonthlyTrendChart";

import TopCategories
from "../components/TopCategories";
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

function AnalyticsPage() {

  const [monthlyAnalytics, setMonthlyAnalytics] =
    useState([]);

  const [categoryTotals, setCategoryTotals] =
    useState({});

  const [weeklyAnalytics, setWeeklyAnalytics] =
    useState([]);

  const [fundUtilization, setFundUtilization] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const toast =
    useToast();

  useEffect(() => {

    async function fetchAnalytics() {

      try {

        const [
          monthlyResponse,
          categoryResponse,
          weeklyResponse,
          utilizationResponse
        ] = await Promise.all([
          getMonthlyAnalytics(),
          getCategoryTotals(),
          getWeeklyAnalytics(),
          getFundUtilization()
        ]);

        setMonthlyAnalytics(monthlyResponse || []);
        setCategoryTotals(categoryResponse || {});
        setWeeklyAnalytics(weeklyResponse || []);
        setFundUtilization(utilizationResponse || []);

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to load analytics"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchAnalytics();

  }, [toast]);

  if (loading) {

    return (

      <AnalyticsSkeleton />
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
          max-w-7xl
          mx-auto
          space-y-8
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
              "
            >
              Analytics
            </h1>

            <p className="text-gray-500 mt-1">
              Analyze spending patterns and financial insights
            </p>

          </div>

          <button
            disabled={loading}
            className="
              bg-white
              border border-gray-100
              shadow-sm
              rounded-2xl
              px-5 py-3
              text-sm
              font-medium
              text-gray-700
              w-fit
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            This Month
          </button>

        </div>

        {error && (
          <ErrorState
            title="Failed to load analytics"
            description={error}
            compact
          />
        )}

        <AnalyticsStats
          monthlyAnalytics={monthlyAnalytics}
          categoryTotals={categoryTotals}
        />

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          <CategoryPieChart
            categoryTotals={categoryTotals}
          />

          <MonthlyTrendChart
            weeklyAnalytics={weeklyAnalytics}
          />

        </div>

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[1.15fr_0.85fr]
            gap-6
          "
        >

          <FundUtilization
            funds={fundUtilization}
          />

          <TopCategories
            categoryTotals={categoryTotals}
          />

        </div>

      </div>

    </div>
  );
}

function AnalyticsSkeleton() {

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-9 w-44 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-5 w-80 max-w-full animate-pulse rounded-xl bg-slate-200" />
          </div>
          <div className="hidden h-11 w-32 animate-pulse rounded-2xl bg-slate-200 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} lines={1} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <CardSkeleton lines={6} />
          <CardSkeleton lines={6} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <CardSkeleton lines={5} />
          <CardSkeleton lines={5} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
