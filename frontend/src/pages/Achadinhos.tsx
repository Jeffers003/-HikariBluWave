import { useEffect, useState } from "react";

import HeroAchadinhos from "@/components/achadinhos/HeroAchadinhos";
import BenefitsBar from "@/components/achadinhos/BenefitsBar";
import FeaturedDeals from "@/components/achadinhos/FeaturedDeals";
import AllDeals from "@/components/achadinhos/AllDeals";
import AchadinhosCTA from "@/components/achadinhos/AchadinhosCTA";
import SearchDeals from "@/components/achadinhos/SearchDeals";
import MarketplaceFilter from "@/components/achadinhos/MarketplaceFilter";
import SkeletonGrid from "@/components/shared/SkeletonGrid";

import CollectionsSection from "@/components/achadinhos/CollectionsSection";

import { useAchadinhos } from "@/hooks/useAchadinhos";

import api from "@/services/api";

import type { Collection } from "@/types/collection";

export default function Achadinhos() {
  const [colecoes, setColecoes] = useState<Collection[]>([]);

  const {
    achadinhos,
    filtrados,
    loading,
    busca,
    setBusca,
    marketplace,
    setMarketplace,
  } = useAchadinhos();

  useEffect(() => {
    async function buscarColecoes() {
      try {
        const response = await api.get("/colecoes");

        setColecoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar coleções:", error);
      }
    }

    buscarColecoes();
  }, []);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0B1220]
          px-6
          py-20
        "
      >
        <SkeletonGrid />
      </div>
    );
  }

  const destaques = achadinhos.filter((item) => item.destaque);

  return (
    <>
      <HeroAchadinhos />

      <BenefitsBar />

      <FeaturedDeals achadinhos={destaques} />

      <section
        className="
          mx-auto
          max-w-7xl
          px-6
          py-10
        "
      >
        <div className="space-y-6">
          <SearchDeals valor={busca} onChange={setBusca} />

          <MarketplaceFilter
            selecionado={marketplace}
            onChange={setMarketplace}
          />
        </div>
      </section>

      <AllDeals achadinhos={filtrados} />

      <CollectionsSection colecoes={colecoes} />

      <AchadinhosCTA />
    </>
  );
}
