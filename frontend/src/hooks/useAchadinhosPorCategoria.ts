// src/hooks/useAchadinhosPorCategoria.ts
import { useEffect, useState } from "react";
import { listarAchadinhosPublicos } from "@/services/achadinho.service";
import type { Produto } from "@/types/produto";

export function useAchadinhosPorCategoria(categoriaId?: string) {
  const [achadinhos, setAchadinhos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaId]);

  async function carregar() {
    setLoading(true);
    try {
      const dados = await listarAchadinhosPublicos(categoriaId);
      setAchadinhos(dados);
    } finally {
      setLoading(false);
    }
  }

  return { achadinhos, loading, recarregar: carregar };
}
