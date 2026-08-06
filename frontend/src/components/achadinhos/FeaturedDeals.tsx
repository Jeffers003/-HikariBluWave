import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";
import DealCard from "./DealCard";

import type { Achadinho } from "@/types/achadinho";

interface FeaturedDealsProps {
  achadinhos: Achadinho[];
}

export default function FeaturedDeals({ achadinhos }: FeaturedDealsProps) {
  return (
    <SectionContainer className="py-16">
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
            ⭐ Selecionados pela equipe
          </span>
        }
        title="Em Destaque"
        subtitle="
        As melhores ofertas encontradas pela HikariBluWave.
        "
      />

      <div
        className="
        grid
        gap-8
        md:grid-cols-2
        xl:grid-cols-3
        "
      >
        {achadinhos.length > 0 ? (
          achadinhos.map((item) => (
            <DealCard
              key={item._id}
              titulo={item.titulo}
              imagem={item.imagem ? `http://localhost:3000${item.imagem}` : ""}
              marketplace={item.marketplace}
              preco={item.preco}
              precoAntigo={item.precoAntigo ?? item.preco}
              link={item.linkAfiliado}
              destaque={item.destaque}
            />
          ))
        ) : (
          <p className="text-slate-400">
            Nenhuma oferta em destaque no momento.
          </p>
        )}
      </div>
    </SectionContainer>
  );
}
