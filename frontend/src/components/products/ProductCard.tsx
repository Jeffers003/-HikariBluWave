import GlassCard from "@/components/shared/GlassCard";
import MarketplaceBadge from "@/components/shared/MarketplaceBadge";
import Price from "@/components/shared/Price";
import PrimaryButton from "@/components/shared/PrimaryButton";

import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Produto } from "@/types/produto";

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <GlassCard
      onClick={() => navigate(`/produtos/${produto.slug}`)}
      className="
    group
    cursor-pointer
    overflow-hidden
    p-5
    bg-[#01081D]
      border-[#0d3d8f89]
      rounded-lg
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-[#046AEE]/50
    hover:shadow-[0_0_40px_rgba(4,106,238,.25)]
  "
    >
      <div className="mb-5 flex items-center-justify-between">
        <MarketplaceBadge marketplace={produto.marketplace} />

        {produto.destaque && (
          <span
            className="
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
            ⭐ Destaque
          </span>
        )}
      </div>

      <div
        className="
          flex
          h-64
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          bg-[#0F172A]
          p-6
        "
      >
        <img
          src={produto.imagem}
          alt={produto.titulo}
          className="
            max-h-full
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </div>

      <h3
        className="
          mt-5
          line-clamp-2
          text-lg
          font-semibold
          text-white
        "
      >
        {produto.titulo}
      </h3>

      {produto.avaliacao && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
          "
        >
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          {produto.avaliacao}

          {produto.vendas && <span>· {produto.vendas} vendas</span>}
        </div>
      )}

      <div className="mt-4">
        <Price atual={produto.preco} antigo={produto.precoAntigo ?? 0} />
      </div>

      <PrimaryButton
        className="
          mt-6
          w-full
          transition-all
          duration-300
          group-hover:shadow-[0_0_30px_rgba(4,106,238,.45)]
        "
        onClick={(e) => {
          e.stopPropagation();
          window.open(produto.linkAfiliado, "_blank");
        }}
      >
        Ver produto
        <ArrowRight size={18} className="ml-2" />
      </PrimaryButton>
    </GlassCard>
  );
}
