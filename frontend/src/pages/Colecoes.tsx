import { useEffect, useState } from "react";

import api from "@/services/api";

import type { Collection } from "@/types/collection";

import HeroColecao from "@/components/collections/HeroColecao";

import CollectionsSection from "@/components/achadinhos/CollectionsSection";

export default function Colecoes() {
  const [colecoes, setColecoes] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarColecoes() {
      try {
        const response = await api.get("/colecoes");
        setColecoes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarColecoes();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Carregando coleções...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-10 py-10">
      <HeroColecao totalColecoes={colecoes.length} />

      <CollectionsSection colecoes={colecoes} />
    </main>
  );
}
