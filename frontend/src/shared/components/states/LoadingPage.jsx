import Spinner from "./Spinner";

function LoadingPage({
  label = "Loading..."
}) {

  return (
    <div
      className="
        min-h-[50vh]
        rounded-3xl
        border border-slate-100
        bg-white
        p-8
      "
    >
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <Spinner className="size-5 text-emerald-700" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export default LoadingPage;
