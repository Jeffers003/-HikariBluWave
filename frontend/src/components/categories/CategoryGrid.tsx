import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";
import CategoryCard from "./CategoryCard";
import SkeletonGrid from "@/components/shared/SkeletonGrid";

interface Category {
  _id: string;
  nome: string;
  imagem: string;
  slug?: string;
}

interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
}

export default function CategoryGrid({
  categories,
  loading = false,
}: CategoryGridProps) {
  return (
    <SectionContainer className="text-start">
      <SectionHeader title="Explore nosso catálogo" />

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              nome={category.nome}
              imagem={category.imagem}
              href={`/categorias/${category.slug ?? category._id}`}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
