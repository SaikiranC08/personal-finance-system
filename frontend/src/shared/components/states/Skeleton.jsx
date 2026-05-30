function SkeletonBlock({
  className = ""
}) {

  return (
    <div
      className={`
        animate-pulse rounded-xl
        bg-slate-200/80
        ${className}
      `}
    />
  );
}

export function CardSkeleton({
  lines = 3,
  className = ""
}) {

  return (
    <div
      className={`
        rounded-3xl border border-slate-100
        bg-white p-6 shadow-sm
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-8 w-36" />
          {Array.from({ length: lines }).map((_, index) => (
            <SkeletonBlock
              key={index}
              className={`h-3 ${index % 2 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
        <SkeletonBlock className="size-12 shrink-0 rounded-2xl" />
      </div>
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 6
}) {

  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="
            grid gap-4 rounded-2xl
            border border-slate-100
            bg-white px-4 py-5
          "
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(110px, 1fr))`
          }}
        >
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <SkeletonBlock
              key={columnIndex}
              className="h-4 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SkeletonBlock;
