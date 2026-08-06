import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import type { Achadinho } from "@/types/achadinho";

export function useAchadinhos() {
  const [achadinhos, setAchadinhos] = useState<Achadinho[]>([]);

  const [loading, setLoading] = useState(true);

  const [busca, setBusca] = useState("");

  const [marketplace, setMarketplace] = useState("Todos");

  async function carregarAchadinhos() {
    try {
      setLoading(true);

      const response = await api.get("/achadinhos");

      setAchadinhos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAchadinhos();
  }, []);

  const filtrados = useMemo(() => {
    return achadinhos.filter((item) => {
      const correspondeBusca = item.titulo
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeMarketplace =
        marketplace === "Todos" || item.marketplace === marketplace;

      return correspondeBusca && correspondeMarketplace;
    });
  }, [achadinhos, busca, marketplace]);

  function limparFiltros() {
    setBusca("");

    setMarketplace("Todos");
  }

  return {
    achadinhos,

    filtrados,

    loading,

    busca,

    setBusca,

    marketplace,

    setMarketplace,

    limparFiltros,
  };
}
