import { useMemo, useState } from "react";

import HeroProdutos from "@/components/products/HeroProdutos";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";

import { useProdutos } from "@/hooks/useProdutos";
import { useCategorias } from "@/hooks/useCategorias";

import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Produtos() {
  const [search, setSearch] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const { categorias } = useCategorias();
  const { produtos, loading } = useProdutos(categoriaAtiva ?? undefined);

  // filtro de texto é feito no front, em cima do que a categoria já trouxe
  // (evita bater na API a cada tecla digitada)
  const produtosFiltrados = useMemo(() => {
    if (!search.trim()) return produtos;

    const termo = search.toLowerCase();
    return produtos.filter((p) => p.titulo.toLowerCase().includes(termo));
  }, [produtos, search]);

  return (
    <>
      <HeroProdutos />

      <SectionContainer>
        <SectionHeader
          title="Todos os Produtos"
          subtitle="Explore tecnologia, acessórios e ofertas selecionadas."
        />

        <div className="mt-10">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            setCategoriaAtiva={setCategoriaAtiva}
          />
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Carregando produtos...</p>
        ) : (
          <ProductGrid products={produtosFiltrados} />
        )}
      </SectionContainer>
    </>
  );
}
