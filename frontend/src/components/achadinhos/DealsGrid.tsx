import DealCard from "./DealCard";
import type { Achadinho } from "@/types/achadinho";
import AnimatedCard from "@/components/shared/AnimatedCard";

interface DealsGridProps {
  achadinhos: Achadinho[];
}

export default function DealsGrid({ achadinhos }: DealsGridProps) {
  return (
    <div
      className="
      grid
      mt-4
      gap-8
      sm:grid-cols-4
      xl:grid-cols-4
      "
    >
      {achadinhos.map((item, index) => (
        <AnimatedCard key={item._id} delay={index * 0.08}>
          <DealCard
            titulo={item.titulo}
            imagem={`http://localhost:3000${item.imagem}`}
            marketplace={item.marketplace}
            preco={item.preco}
            precoAntigo={item.precoAntigo ?? 0}
            link={item.linkAfiliado}
            destaque={item.destaque}
          />
        </AnimatedCard>
      ))}
    </div>
  );
}
