import {
  AlertCircle
} from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description,
  action,
  compact = false
}) {

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        rounded-2xl border border-red-100
        bg-red-50/70 text-center
        ${compact ? "px-5 py-8" : "px-6 py-12"}
      `}
      role="alert"
    >
      <div
        className="
          flex size-12 items-center justify-center
          rounded-2xl
          bg-white
          text-red-600
          shadow-sm
        "
      >
        <AlertCircle size={22} strokeWidth={1.8} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}

export default ErrorState;
