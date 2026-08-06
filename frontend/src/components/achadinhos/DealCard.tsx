import GlassCard from "@/components/shared/GlassCard";
import MarketplaceBadge from "@/components/shared/MarketplaceBadge";
import Price from "@/components/shared/Price";
import PrimaryButton from "@/components/shared/PrimaryButton";
import DiscountBadge from "@/components/shared/DiscountBadge";

import { ArrowRight } from "lucide-react";

interface DealCardProps {
  titulo: string;
  imagem: string;
  marketplace: string;
  preco: number;
  precoAntigo: number;
  link: string;
  destaque?: boolean;
}

export default function DealCard({
  titulo,
  imagem,
  marketplace,
  preco,
  precoAntigo,
  link,
  destaque,
}: DealCardProps) {
  return (
    <GlassCard
      className="
    group
    overflow-hidden
    p-5
    bg-[#01081D]
      border-[#0D3D8F]
      rounded-lg
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-[#046AEE]/50
    hover:shadow-[0_0_40px_rgba(4,106,238,.25)]
  "
    >
      {/* Topo */}
      <div className="mb-5 flex items-center justify-between">
        <MarketplaceBadge marketplace={marketplace} />

        <DiscountBadge precoAtual={preco} precoAntigo={precoAntigo} />
      </div>

      {/* Imagem */}
      <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#0F172A] p-6">
        <img
          src={imagem}
          alt={titulo}
          className="
            max-h-full
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Escolha da Hikari */}
      {destaque && (
        <div className="mt-5">
          <span
            className="
inline-flex
items-center
rounded-full

border
border-yellow-400/30

bg-yellow-400/10

px-3
py-1

text-xs
font-semibold

text-yellow-400
"
          >
            ⭐ Escolha da Hikari
          </span>
        </div>
      )}

      {/* Título */}
      <h3 className="mt-5 line-clamp-2 text-lg font-semibold text-white">
        {titulo}
      </h3>

      {/* Preços */}
      <div className="mt-4">
        <Price atual={preco} antigo={precoAntigo} />
      </div>

      {/* Botão */}
      <PrimaryButton
        className="
    mt-6
    w-full
    transition-all
    duration-300
    group-hover:shadow-[0_0_30px_rgba(4,106,238,.45)]
  "
        onClick={() => window.open(link, "_blank")}
      >
        Comprar Agora
        <ArrowRight size={18} className="ml-2" />
      </PrimaryButton>
    </GlassCard>
  );
}
