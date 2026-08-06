import ProductCard from "./ProductCard";

import type { Produto } from "@/types/produto";

import AnimatedCard from "@/components/shared/AnimatedCard";

interface ProductGridProps {
  products: Produto[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        className="
          flex
          min-h-40
          items-center
          justify-center
          rounded-3xl
          border
          border-[#263244]
          bg-[#111827]
          text-slate-400
        "
      >
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {products.map((produto, index) => (
        <AnimatedCard key={produto._id} delay={index * 0.08}>
          <ProductCard produto={produto} />
        </AnimatedCard>
      ))}
    </div>
  );
}
