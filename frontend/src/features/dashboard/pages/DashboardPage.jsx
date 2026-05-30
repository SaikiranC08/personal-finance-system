import {
  useEffect,
  useState
} from "react";

import {
  getDashboard
} from "../api/getDashboard";

import {
  getWeeklyAnalytics
} from "../api/getWeeklyAnalytics";

import DashboardStats
from "../components/DashboardStats";

import QuickActions
from "../components/QuickActions";

import RecentExpenses
from "../components/RecentExpenses";

import RecentFunds
from "../components/RecentFunds";

import WeeklySpendingSnapshot
from "../components/WeeklySpendingSnapshot";
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

function DashboardPage() {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [weeklyAnalytics, setWeeklyAnalytics] =
    useState([]);

  const [error, setError] =
    useState("");

  const toast =
    useToast();

  useEffect(() => {

    async function fetchDashboard() {

      try {

        const [
          dashboardResponse,
          weeklyResponse
        ] = await Promise.all([
          getDashboard(),
          getWeeklyAnalytics()
        ]);

        setDashboard(dashboardResponse);
        setWeeklyAnalytics(weeklyResponse || []);

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const message =
          getFriendlyErrorMessage(
            error,
            "Failed to load dashboard"
          );

        setError(message);
        toast.error(message);

      } finally {

        setLoading(false);
      }
    }

    fetchDashboard();

  }, [toast]);

  if (loading) {

    return (

      <DashboardSkeleton />
    );
  }

  const dashboardData =
    dashboard || {
      monthlyExpense: 0,
      weeklyExpense: 0,
      activeFunds: 0,
      remainingFundAmount: 0,
      recentExpenses: [],
      recentFunds: []
    };

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  const storedUsername =
    localStorage.getItem("username");

  const username =
    storedUsername?.trim();

  const displayName =
    username
      ? username.charAt(0).toUpperCase() + username.slice(1)
      : "";

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
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-gray-900
              "
            >
              {displayName
                ? `Welcome back, ${displayName} 👋`
                : "Welcome back 👋"}
            </h1>

            <p className="text-gray-500 mt-2">
              Here’s your financial overview today.
            </p>

          </div>

          <div
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
            "
          >
            {today}
          </div>

        </div>

        <QuickActions />

        {error && (
          <ErrorState
            title="Failed to load dashboard"
            description={error}
            compact
          />
        )}

        <DashboardStats
          dashboard={dashboardData}
        />

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[1.15fr_0.85fr]
            gap-6
          "
        >

          <RecentExpenses
            expenses={dashboardData.recentExpenses || []}
          />

          <RecentFunds
            funds={dashboardData.recentFunds || []}
          />

        </div>

        <WeeklySpendingSnapshot
          weeklyAnalytics={weeklyAnalytics}
        />

      </div>

    </div>
  );
}

function DashboardSkeleton() {

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-3">
            <div className="h-10 w-72 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-5 w-56 animate-pulse rounded-xl bg-slate-200" />
          </div>
          <div className="hidden h-11 w-44 animate-pulse rounded-2xl bg-slate-200 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} lines={1} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <CardSkeleton lines={5} />
          <CardSkeleton lines={5} />
        </div>

        <CardSkeleton lines={6} />
      </div>
    </div>
  );
}

export default DashboardPage;
