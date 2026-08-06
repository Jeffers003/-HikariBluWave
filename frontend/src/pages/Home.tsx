import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import "../index.css";

import api from "@/services/api";

import HeroHome from "@/components/home/HeroHome";
import BenefitsBar from "@/components/achadinhos/BenefitsBar";
import HomeContent from "@/components/home/HomeContent";
import CategoriesPreview from "@/components/home/CategoriesPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionsSection from "@/components/achadinhos/CollectionsSection";
import Reviews from "@/components/home/Reviews";
import CallToAction from "@/components/home/CallToAction";

import { useCategorias } from "@/hooks/useCategorias";

import type { Collection } from "@/types/collection";

export function Home() {
  const { categorias, loading } = useCategorias();

  const [colecoes, setColecoes] = useState<Collection[]>([]);

  useEffect(() => {
    api.get("/colecoes").then((res) => setColecoes(res.data));
  }, []);

  return (
    <Box>
      <HeroHome />

      <BenefitsBar />

      <HomeContent>
        <CategoriesPreview categories={categorias} loading={loading} />

        <FeaturedProducts />

        <CollectionsSection colecoes={colecoes} />

        <Reviews />

        <CallToAction />
      </HomeContent>
    </Box>
  );
}
