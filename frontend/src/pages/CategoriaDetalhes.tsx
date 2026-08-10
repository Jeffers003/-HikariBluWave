// src/pages/CategoriaDetalhes.tsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import ProductGrid from "@/components/products/ProductGrid";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";

import { useCategorias } from "@/hooks/useCategorias";
import { useProdutos } from "@/hooks/useProdutos";
import { useAchadinhosPorCategoria } from "@/hooks/useAchadinhosPorCategoria";

export default function CategoriaDetalhes() {
  // o CategoryCard manda category.slug se existir, senão o _id —
  // então esse parâmetro pode ser um ou outro dependendo do produto.
  const { slug } = useParams<{ slug: string }>();

  const { categorias, loading: carregandoCategorias } = useCategorias();

  const categoriaAtual = categorias.find(
    (c) => c._id === slug || (c as any).slug === slug,
  );

  // já manda o _id certo pro filtro assim que a categoria for encontrada
  const { produtos, loading: carregandoProdutos } = useProdutos(
    categoriaAtual?._id,
  );
  const { achadinhos, loading: carregandoAchadinhos } = useAchadinhosPorCategoria(
    categoriaAtual?._id,
  );

  const carregandoItens = carregandoProdutos || carregandoAchadinhos;

  // junta os dois tipos numa lista só, já que ambos foram adaptados
  // pro mesmo formato (Produto) e o ProductGrid não precisa saber a origem
  const itens = useMemo(
    () => [...produtos, ...achadinhos],
    [produtos, achadinhos],
  );

  if (carregandoCategorias) {
    return (
      <SectionContainer>
        <p className="text-center text-slate-400">Carregando categoria...</p>
      </SectionContainer>
    );
  }

  if (!categoriaAtual) {
    return (
      <SectionContainer>
        <p className="text-center text-slate-400">
          Categoria não encontrada.{" "}
          <Link to="/categorias" className="text-[#046AEE] underline">
            Voltar pra categorias
          </Link>
        </p>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionHeader
        title={categoriaAtual.nome}
        subtitle={categoriaAtual.descricao}
      />

      <div className="mt-10">
        {carregandoItens ? (
          <p className="text-center text-slate-400">Carregando produtos...</p>
        ) : (
          <ProductGrid products={itens} />
        )}
      </div>
    </SectionContainer>
  );
}
