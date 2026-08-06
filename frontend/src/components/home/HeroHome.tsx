import HeroSection from "@/components/shared/HeroSection";
import HeroArtwork from "./HeroArtwork";
import PrimaryButton from "@/components/shared/PrimaryButton";
import MarketplaceBadge from "@/components/shared/MarketplaceBadge";
import "./Hero.css";
import { ArrowRight } from "lucide-react";
import Balloon from "../Balloon";
export default function HeroHome() {
  return (
    <HeroSection
      badge={<Balloon />}
      left={
        <>
          <h1 className="hero-title">
            TECNOLOGIA <br />
            <span className="hero-title-blue">DO FUTURO</span> <br />
            NA SUA MÃO
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Descubra produtos selecionados, ofertas verificadas e os melhores
            achadinhos da internet em um só lugar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MarketplaceBadge marketplace="mercado-livre" />

            <MarketplaceBadge marketplace="shopee" />

            <MarketplaceBadge marketplace="amazon" />

            <MarketplaceBadge marketplace="oficial" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton>
              COMPRE AGORA
              <ArrowRight className="ml-3" size={20} />
            </PrimaryButton>
          </div>
        </>
      }
      right={<HeroArtwork />}
    />
  );
}
