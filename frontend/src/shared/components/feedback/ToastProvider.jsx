import {
  CheckCircle2,
  Info,
  X,
  XCircle
} from "lucide-react";
import {
  useCallback,
  useMemo,
  useState
} from "react";
import {
  ToastContext
} from "./toastContext";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    className: "border-emerald-100 bg-white text-slate-800",
    iconClass: "text-emerald-600 bg-emerald-50"
  },
  error: {
    icon: XCircle,
    className: "border-red-100 bg-white text-slate-800",
    iconClass: "text-red-600 bg-red-50"
  },
  info: {
    icon: Info,
    className: "border-slate-200 bg-white text-slate-800",
    iconClass: "text-emerald-700 bg-emerald-50"
  }
};

export function ToastProvider({ children }) {

  const [toasts, setToasts] =
    useState([]);

  const removeToast =
    useCallback((id) => {
      setToasts((current) =>
        current.filter((toast) => toast.id !== id)
      );
    }, []);

  const showToast =
    useCallback((toast) => {
      const id =
        crypto?.randomUUID?.() || String(Date.now());

      const nextToast = {
        id,
        type: "info",
        duration: 3500,
        ...toast
      };

      setToasts((current) => [
        nextToast,
        ...current
      ].slice(0, 4));

      window.setTimeout(
        () => removeToast(id),
        nextToast.duration
      );
    }, [removeToast]);

  const value =
    useMemo(
      () => ({
        showToast,
        success: (message) =>
          showToast({
            type: "success",
            message
          }),
        error: (message) =>
          showToast({
            type: "error",
            message
          }),
        info: (message) =>
          showToast({
            type: "info",
            message
          })
      }),
      [showToast]
    );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="
          fixed right-4 top-4 z-50
          flex w-[calc(100vw-2rem)]
          max-w-sm flex-col gap-3
          sm:right-6 sm:top-6
        "
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({
  toast,
  onDismiss
}) {

  const style =
    toastStyles[toast.type] || toastStyles.info;

  const Icon =
    style.icon;

  return (
    <div
      className={`
        flex items-start gap-3
        rounded-2xl border
        px-4 py-3
        text-sm
        shadow-lg shadow-slate-900/8
        ${style.className}
      `}
    >
      <span
        className={`
          mt-0.5 flex size-7 shrink-0
          items-center justify-center
          rounded-full
          ${style.iconClass}
        `}
      >
        <Icon size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">
          {toast.title || getDefaultTitle(toast.type)}
        </p>
        <p className="mt-0.5 leading-5 text-slate-500">
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="
          mt-0.5 flex size-7 shrink-0
          items-center justify-center
          rounded-full
          text-slate-400 transition
          hover:bg-slate-50 hover:text-slate-700
        "
        aria-label="Dismiss notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}

function getDefaultTitle(type) {
  if (type === "success") {
    return "Done";
  }

  if (type === "error") {
    return "Something went wrong";
  }

  return "FundFlow";
}
