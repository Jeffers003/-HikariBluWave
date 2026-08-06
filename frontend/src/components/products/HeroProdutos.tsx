import HeroSection from "../shared/HeroSection";
import PrimaryButton from "../shared/PrimaryButton";
import { ArrowRight } from "lucide-react";
import Balloon from "../Balloon";
import CardTD from "../HeroImage";
export default function HeroProdutos() {
  return (
    <HeroSection
      badge={<Balloon />}
      left={
        <div>
          <div>
            <h1 className="hero-title">
              OFERTAS <br />
              <span className="hero-title-blue">DO FUTURO</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Descubra produtos selecionados, ofertas verificadas e os melhores
              achadinhos da internet em um só lugar.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton>
              EXPLORAR PRODUTOS
              <ArrowRight className="ml-3" size={20} />
            </PrimaryButton>
          </div>
        </div>
      }
      right={<CardTD />}
    />
  );
}
