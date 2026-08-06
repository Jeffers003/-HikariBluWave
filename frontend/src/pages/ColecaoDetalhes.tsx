import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "@/services/api";

import "@/pages/pages.css";

import AllDeals from "@/components/achadinhos/AllDeals";
import CollectionHero from "@/components/collections/CollectionHero";
import type { Collection } from "@/types/collection";
import type { Achadinho } from "@/types/achadinho";

export default function ColecaoDetalhes() {
  const { slug } = useParams();

  const [colecao, setColecao] = useState<Collection | null>(null);
  const [produtos, setProdutos] = useState<Achadinho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      if (!slug) return;

      try {
        const colecoesResponse = await api.get("/colecoes");

        const encontrada = colecoesResponse.data.find(
          (c: Collection) => c.slug === slug,
        );

        setColecao(encontrada || null);

        const produtosResponse = await api.get(`/achadinhos/colecao/${slug}`);

        setProdutos(produtosResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010308] text-white">
        Carregando...
      </div>
    );
  }

  if (!colecao) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010308] text-white">
        Coleção não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010308] py-10">
      <CollectionHero colecao={colecao} totalProdutos={produtos.length} />

      <AllDeals achadinhos={produtos} />
    </div>
  );
}
