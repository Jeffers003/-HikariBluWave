import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";

import ProductGrid from "@/components/products/ProductGrid";

import { useProdutos } from "@/hooks/useProdutos";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const { produtos } = useProdutos();
  return (
    <SectionContainer>
      <div className="flex  items-center gap-4 text-center justify-between ">
        {" "}
        <SectionHeader title="PRODUTOS EM DESTAQUE" />
        <div className=" flex justify-center">
          <Link
            to="/produtos"
            className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-[#046AEE]
      px-6
      py-3
      font-medium
      text-[#53A8FF]
      transition-all
      duration-300
      hover:bg-[#046AEE]
      hover:text-white
      hover:shadow-[0_0_25px_rgba(4,106,238,.35)]
    "
          >
            Ver todos os produtos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <ProductGrid products={produtos.slice(0, 4)} />
      </div>
    </SectionContainer>
  );
}
