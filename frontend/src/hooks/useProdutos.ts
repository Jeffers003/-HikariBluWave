// src/hooks/useProdutos.ts
import { useEffect, useState } from "react";
import { listarProdutosPublicos } from "@/services/produto.service";
import type { Produto } from "@/types/produto";

export function useProdutos(categoriaId?: string) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaId]);

  async function carregar() {
    setLoading(true);
    try {
      const resposta = await listarProdutosPublicos({
        categoria: categoriaId || undefined,
        limit: 50, // ajuste se quiser paginação de verdade depois
      });
      setProdutos(resposta.produtos);
    } finally {
      setLoading(false);
    }
  }

  return { produtos, loading, recarregar: carregar };
}
