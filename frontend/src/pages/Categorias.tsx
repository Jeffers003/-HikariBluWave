import HeroCategories from "@/components/categories/HeroCategories";
import CategoryGrid from "@/components/categories/CategoryGrid";
import BenefitsBar from "@/components/achadinhos/BenefitsBar";
import AchadinhosCTA from "@/components/achadinhos/AchadinhosCTA";
import { useCategorias } from "@/hooks/useCategorias";
import CategoriaDetalhes from "./CategoriaDetalhes";
export default function Categorias() {
  const { categorias, loading } = useCategorias();

  return (
    <>
      <HeroCategories />
      <BenefitsBar />
      <CategoryGrid categories={categorias} loading={loading} />
      <CategoriaDetalhes />
      <AchadinhosCTA />
    </>
  );
}
