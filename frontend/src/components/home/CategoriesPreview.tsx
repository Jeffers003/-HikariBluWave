import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";
import CategoryCard from "@/components/categories/CategoryCard";

import type { Categoria } from "@/types/categoria";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoriesPreviewProps {
  categories: Categoria[];
  loading: boolean;
}

export default function CategoriesPreview({
  categories,
  loading,
}: CategoriesPreviewProps) {
  return (
    <SectionContainer className="flex flex-col w-[100%] ">
      <div className="flex  items-center gap-4 text-center justify-between ">
        <SectionHeader title="CATEGORIAS" />
        <div className=" flex justify-center">
          <Link
            to="/categorias"
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
            Ver todas as categorias
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-3xl border border-[#263244] bg-[#111827]"
              />
            ))
          : categories
              .slice(0, 6)
              .map((categoria) => (
                <CategoryCard
                  key={categoria._id}
                  nome={categoria.nome}
                  imagem={categoria.imagem}
                  href={`/categorias/${categoria.slug}`}
                />
              ))}
      </div>
    </SectionContainer>
  );
}
