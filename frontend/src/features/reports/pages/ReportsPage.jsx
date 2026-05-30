import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  AlertCircle,
  Calendar,
  Download,
  FileText,
  LoaderCircle,
  ReceiptText,
  ShieldCheck,
  Wallet
} from "lucide-react";

import {
  downloadExpenseReport
} from "../api/downloadExpenseReport";

import {
  downloadFundReport
} from "../api/downloadFundReport";

import {
  getReportFunds
} from "../api/getReportFunds";

import {
  downloadPdfFromResponse
} from "../utils/downloadPdf";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import EmptyState from "../../../shared/components/states/EmptyState";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";

function ReportsPage() {

  const today =
    new Date();

  const defaultEndDate =
    formatDateInput(today);

  const defaultStartDate =
    formatDateInput(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  const [startDate, setStartDate] =
    useState(defaultStartDate);

  const [endDate, setEndDate] =
    useState(defaultEndDate);

  const [funds, setFunds] =
    useState([]);

  const [selectedFundId, setSelectedFundId] =
    useState("");

  const [fundsLoading, setFundsLoading] =
    useState(true);

  const [expenseExporting, setExpenseExporting] =
    useState(false);

  const [fundExporting, setFundExporting] =
    useState(false);

  const [message, setMessage] =
    useState(null);

  const [hasGeneratedReport, setHasGeneratedReport] =
    useState(false);

  const toast =
    useToast();

  useEffect(() => {

    async function fetchFunds() {

      try {

        const response =
          await getReportFunds();

        setFunds(response);

        if (response.length > 0) {
          setSelectedFundId(
            String(response[0].fundId)
          );
        }

      } catch (error) {

        console.error(error);

        if (isUnauthorizedError(error)) {
          handleSessionExpired(toast);
          return;
        }

        const errorMessage =
          getFriendlyErrorMessage(
            error,
            "Failed to load funds for reports"
          );

        setMessage({
          type: "error",
          text: errorMessage
        });

        toast.error(errorMessage);

      } finally {

        setFundsLoading(false);
      }
    }

    fetchFunds();

  }, [toast]);

  const isExporting =
    expenseExporting || fundExporting;

  const selectedFund =
    useMemo(
      () =>
        funds.find(
          (fund) =>
            String(fund.fundId) === selectedFundId
        ),
      [funds, selectedFundId]
    );

  async function handleExpenseExport() {

    if (!startDate || !endDate) {

      setMessage({
        type: "error",
        text: "Choose both start and end dates."
      });

      toast.error("Choose both start and end dates.");

      return;
    }

    if (startDate > endDate) {

      setMessage({
        type: "error",
        text: "Start date cannot be after end date."
      });

      toast.error("Start date cannot be after end date.");

      return;
    }

    setMessage(null);
    setExpenseExporting(true);

    try {

      const response =
        await downloadExpenseReport({
          startDate,
          endDate
        });

      await downloadPdfFromResponse(
        response,
        `expense-report-${startDate}-to-${endDate}.pdf`
      );

      setHasGeneratedReport(true);
      toast.success("PDF downloaded");

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const errorMessage =
        getFriendlyErrorMessage(
          error,
          "Unable to generate PDF"
        );

      setMessage({
        type: "error",
        text: errorMessage
      });

      toast.error(errorMessage);

    } finally {

      setExpenseExporting(false);
    }
  }

  async function handleFundExport() {

    if (!selectedFundId) {

      setMessage({
        type: "error",
        text: "Select a fund before exporting."
      });

      toast.error("Select a fund before exporting.");

      return;
    }

    setMessage(null);
    setFundExporting(true);

    try {

      const response =
        await downloadFundReport(
          selectedFundId
        );

      await downloadPdfFromResponse(
        response,
        `fund-utilization-${selectedFundId}.pdf`
      );

      setHasGeneratedReport(true);
      toast.success("PDF downloaded");

    } catch (error) {

      console.error(error);

      if (isUnauthorizedError(error)) {
        handleSessionExpired(toast);
        return;
      }

      const errorMessage =
        getFriendlyErrorMessage(
          error,
          "Unable to generate PDF"
        );

      setMessage({
        type: "error",
        text: errorMessage
      });

      toast.error(errorMessage);

    } finally {

      setFundExporting(false);
    }
  }

  return (

    <div
      className="
        min-h-screen
        bg-[#f7faf7]
        px-4 py-8
        sm:px-6
        lg:px-10 lg:py-12
      "
    >

      <div
        className="
          mx-auto
          max-w-5xl
          space-y-8
        "
      >

        <header
          className="
            pt-2
            sm:pt-4
          "
        >

          <div
            className="
              mb-5
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-emerald-100
              bg-white
              text-emerald-900
              shadow-sm
            "
          >
            <ShieldCheck size={22} />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              tracking-normal
              text-[#0f2f22]
              sm:text-4xl
            "
          >
            Reports
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-base
              leading-7
              text-slate-500
            "
          >
            Generate downloadable financial documents and utilization summaries.
          </p>

        </header>

        {message && (
          <div
            className="
              flex items-start gap-3
              rounded-2xl
              border border-red-100
              bg-red-50
              px-4 py-3
              text-sm
              text-red-700
              shadow-sm
            "
            role="alert"
          >
            <AlertCircle
              className="mt-0.5 shrink-0"
              size={18}
            />
            <span>{message.text}</span>
          </div>
        )}

        <section
          className="
            rounded-3xl
            border border-emerald-100
            bg-white
            p-6
            shadow-[0_18px_50px_rgba(15,47,34,0.07)]
            sm:p-8
          "
        >

          <CardHeader
            icon={<FileText size={22} />}
            title="Expense Report"
            subtitle="Export transaction history for a custom date range."
          />

          <div
            className="
              mt-8
              grid gap-4
              lg:grid-cols-[1fr_1fr_auto]
              lg:items-end
            "
          >

            <DateField
              label="Start date"
              value={startDate}
              onChange={setStartDate}
              disabled={isExporting}
            />

            <DateField
              label="End date"
              value={endDate}
              onChange={setEndDate}
              disabled={isExporting}
            />

            <ExportButton
              loading={expenseExporting}
              disabled={isExporting}
              loadingLabel="Generating PDF..."
              onClick={handleExpenseExport}
            >
              Export PDF
            </ExportButton>

          </div>

        </section>

        <section
          className="
            rounded-3xl
            border border-emerald-100
            bg-white
            p-6
            shadow-[0_18px_50px_rgba(15,47,34,0.07)]
            sm:p-8
          "
        >

          <CardHeader
            icon={<Wallet size={22} />}
            title="Fund Utilization Report"
            subtitle="Generate owner-specific financial utilization reports."
          />

          <div
            className="
              mt-8
              grid gap-4
              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >

            <div>
              <label
                className="
                  mb-2 block
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                Fund
              </label>

              <select
                value={selectedFundId}
                onChange={(event) =>
                  setSelectedFundId(event.target.value)
                }
              disabled={fundsLoading || fundExporting}
                className="
                  h-12 w-full
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-slate-800
                  outline-none
                  transition
                  focus:border-emerald-700
                  focus:ring-4
                  focus:ring-emerald-100
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                  disabled:text-slate-400
                "
              >
                {fundsLoading ? (
                  <option>Loading funds...</option>
                ) : (
                  <>
                    <option value="">
                      Select a fund
                    </option>
                    {funds.map((fund) => (
                      <option
                        key={fund.fundId}
                        value={fund.fundId}
                      >
                        {getFundLabel(fund)}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <ExportButton
              loading={fundExporting}
              disabled={
                isExporting ||
                fundsLoading ||
                !selectedFundId
              }
              loadingLabel="Generating PDF..."
              onClick={handleFundExport}
            >
              Export PDF
            </ExportButton>

          </div>

          {selectedFund && (
            <FundPreview fund={selectedFund} />
          )}

          {!fundsLoading && funds.length === 0 && (
            <div className="mt-6">
              <EmptyState
                icon={Wallet}
                title="No funds available"
                description="Create your first shared fund before exporting utilization reports."
                compact
              />
            </div>
          )}

        </section>

        {!hasGeneratedReport && (
          <EmptyState
            icon={ReceiptText}
            title="No reports generated yet"
            description="Generate your first financial report."
            compact
          />
        )}

      </div>

    </div>
  );
}

function CardHeader({
  icon,
  title,
  subtitle
}) {

  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row sm:items-start
      "
    >
      <div
        className="
          flex h-12 w-12
          shrink-0
          items-center justify-center
          rounded-2xl
          bg-emerald-50
          text-emerald-900
        "
      >
        {icon}
      </div>

      <div>
        <h2
          className="
            text-2xl
            font-semibold
            tracking-normal
            text-[#0f2f22]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-500
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  disabled
}) {

  return (
    <div>
      <label
        className="
          mb-2 block
          text-sm
          font-medium
          text-slate-600
        "
      >
        {label}
      </label>

      <div className="relative">
        <Calendar
          className="
            pointer-events-none
            absolute left-4 top-1/2
            -translate-y-1/2
            text-slate-400
          "
          size={18}
        />
        <input
          type="date"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          disabled={disabled}
          className="
            h-12 w-full
            rounded-2xl
            border border-slate-200
            bg-white
            pl-11 pr-4
            text-sm
            font-medium
            text-slate-800
            outline-none
            transition
            focus:border-emerald-700
            focus:ring-4
            focus:ring-emerald-100
            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-400
          "
        />
      </div>
    </div>
  );
}

function ExportButton({
  loading,
  disabled,
  loadingLabel = "Loading...",
  onClick,
  children
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex h-12
        w-full items-center justify-center
        gap-2
        rounded-2xl
        bg-[#0f3d2e]
        px-6
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-emerald-900/10
        transition
        hover:bg-[#0b3024]
        disabled:cursor-not-allowed
        disabled:bg-slate-300
        disabled:shadow-none
        lg:w-auto
      "
    >
      {loading ? (
        <LoaderCircle
          className="animate-spin"
          size={18}
        />
      ) : (
        <Download size={18} />
      )}
      {loading ? loadingLabel : children}
    </button>
  );
}

function FundPreview({ fund }) {

  const amountReceived =
    Number(fund.amountReceived || 0);

  const remainingAmount =
    Number(fund.remainingAmount || 0);

  const usedAmount =
    Math.max(
      amountReceived - remainingAmount,
      0
    );

  const utilizationPercentage =
    amountReceived > 0
      ? Math.min(
          (usedAmount / amountReceived) * 100,
          100
        )
      : 0;

  return (
    <div
      className="
        mt-6
        rounded-3xl
        border border-emerald-100
        bg-emerald-50/60
        p-5
      "
    >
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              text-emerald-800
            "
          >
            Selected owner
          </p>
          <p
            className="
              mt-2
              text-xl
              font-semibold
              text-[#0f2f22]
            "
          >
            {getFundLabel(fund)}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-white
            px-4 py-3
            text-left
            shadow-sm
            sm:text-right
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Utilization
          </p>
          <p
            className="
              text-2xl
              font-bold
              text-emerald-900
            "
          >
            {utilizationPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          grid gap-3
          sm:grid-cols-3
        "
      >
        <Metric
          label="Remaining amount"
          value={formatCurrency(remainingAmount)}
        />
        <Metric
          label="Used amount"
          value={formatCurrency(usedAmount)}
        />
        <Metric
          label="Total fund"
          value={formatCurrency(amountReceived)}
        />
      </div>

      <div
        className="
          mt-5 h-2
          overflow-hidden
          rounded-full
          bg-white
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-emerald-800
          "
          style={{
            width: `${utilizationPercentage}%`
          }}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value
}) {

  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-4
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>
      <p
        className="
          mt-1
          text-lg
          font-semibold
          text-[#0f2f22]
        "
      >
        {value}
      </p>
    </div>
  );
}

function getFundLabel(fund) {

  if (fund.ownerType === "SELF") {
    return "My Wallet";
  }

  return fund.ownerName || "Unnamed fund";
}

function formatCurrency(value) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(Number(value || 0));
}

function formatDateInput(date) {

  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1).padStart(2, "0");

  const day =
    String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default ReportsPage;
