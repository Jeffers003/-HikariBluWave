import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";
import DealsGrid from "./DealsGrid";
import EmptyDealsState from "./EmptyDealsState";
import type { Achadinho } from "@/types/achadinho";
import PriceNotice from "../shared/PriceNotice";

interface AllDealsProps {
  achadinhos: Achadinho[];
}

export default function AllDeals({ achadinhos }: AllDealsProps) {
  return (
    <SectionContainer>
      <PriceNotice />
      <SectionHeader
        badge={
          <span
            className="
          
            rounded-full
            border
            border-[#046AEE]/30
            bg-[#046AEE]/10
            px-4
            py-2
            text-sm
            text-[#53A8FF]
            "
          >
            🔥 Ofertas atualizadas
          </span>
        }
        title="Todos os Achadinhos"
        subtitle="
        Encontre produtos selecionados nos maiores marketplaces.
        "
      />

      {achadinhos.length > 0 ? (
        <DealsGrid achadinhos={achadinhos} />
      ) : (
        <EmptyDealsState />
      )}
    </SectionContainer>
  );
}
