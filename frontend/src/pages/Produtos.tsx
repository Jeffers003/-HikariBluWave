import { useState } from "react";

import HeroProdutos from "@/components/products/HeroProdutos";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";

import { produtosMock } from "@/data/produtos";

import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Produtos() {
  console.log("Página Produtos carregou");
  const [search, setSearch] = useState("");

  const produtosFiltrados = produtosMock;

  return (
    <>
      <HeroProdutos />

      <SectionContainer>
        <SectionHeader
          title="Todos os Produtos"
          subtitle="Explore tecnologia, acessórios e ofertas selecionadas."
        />

        <div className="mt-10">
          <ProductFilters search={search} setSearch={setSearch} />
        </div>

        <ProductGrid products={produtosFiltrados} />
      </SectionContainer>
    </>
  );
}
