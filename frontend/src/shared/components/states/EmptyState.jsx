import {
  Inbox
} from "lucide-react";

function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  compact = false
}) {

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        rounded-2xl border border-dashed border-slate-200
        bg-slate-50/70 text-center
        ${compact ? "px-5 py-8" : "px-6 py-12"}
      `}
    >
      <div
        className="
          flex size-12 items-center justify-center
          rounded-2xl
          bg-emerald-50
          text-emerald-700
        "
      >
        <Icon size={22} strokeWidth={1.8} />
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

export default EmptyState;
