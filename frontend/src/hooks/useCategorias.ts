import { useEffect, useState } from "react";
import { listarCategoriasPublicas } from "@/services/categoria.service";
import type { Categoria } from "@/types/categoria";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const data = await listarCategoriasPublicas();
      setCategorias(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    categorias,
    loading,
    recarregar: carregar,
  };
}
