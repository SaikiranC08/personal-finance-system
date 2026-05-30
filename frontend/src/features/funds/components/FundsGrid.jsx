import {
  Plus,
  WalletCards
} from "lucide-react";
import EmptyState from "../../../shared/components/states/EmptyState";
import FundCard from "./FundCard";

function FundsGrid({
  funds,
  onCreateFund
}) {

  if (funds.length === 0) {

    return (

      <EmptyState
        icon={WalletCards}
        title="No funds available"
        description="Create your first shared fund."
        action={
          onCreateFund && (
            <button
              type="button"
              onClick={onCreateFund}
              className="
                inline-flex items-center gap-2
                rounded-xl bg-[#0f3d2e]
                px-4 py-2.5
                text-sm font-semibold
                text-white
                transition hover:bg-[#0b3024]
              "
            >
              <Plus size={16} />
              Create Fund
            </button>
          )
        }
      />
    );
  }

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >

      {funds.map((fund) => (

        <FundCard
          key={fund.fundId}
          fund={fund}
        />

      ))}

    </div>
  );
}

export default FundsGrid;
