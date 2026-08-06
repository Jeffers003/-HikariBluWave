import HeroSection from "../shared/HeroSection";
import PrimaryButton from "../shared/PrimaryButton";
import { ArrowRight } from "lucide-react";
import Balloon from "../Balloon";
import CardTD from "../HeroImage";
export default function HeroCategories() {
  return (
    <HeroSection
      badge={<Balloon />}
      left={
        <div>
          <div className="flex flex-col gap-6">
            <h1 className="hero-title">
              NAVEGUE POR <br />
              <span className="hero-title-blue">CATEGORIAS</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Encontre produtos organizados para facilitar sua busca, desde
              periféricos gamers até dispositivos para casa inteligente.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton>
              EXPLORAR CATEGORIAS
              <ArrowRight className="ml-3" size={20} />
            </PrimaryButton>
          </div>
        </div>
      }
      right={<CardTD />}
    />
  );
}
