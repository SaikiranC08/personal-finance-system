import {
  LoaderCircle
} from "lucide-react";

function Spinner({
  className = "size-4",
  label
}) {

  return (
    <span className="inline-flex items-center gap-2">
      <LoaderCircle
        className={`animate-spin ${className}`}
        aria-hidden="true"
      />
      {label && (
        <span>{label}</span>
      )}
    </span>
  );
}

export default Spinner;
