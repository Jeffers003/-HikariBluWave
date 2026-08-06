import HeroSection from "@/components/achadinhos/HeroAchadinhosV2";

import PrimaryButton from "@/components/shared/PrimaryButton";
import ArtAchadinhos from "@/components/achadinhos/ArtAchadinhos";
import { ArrowRight, ShieldCheck } from "lucide-react";

import "./cssart.css";
export default function HeroAchadinhos() {
  return (
    <HeroSection
      badge={
        <span className="rounded-full border border-[#046AEE]/30 bg-[#046AEE]/10 px-4 mt-10 py-2 text-sm text-[#53A8FF]  ">
          🔥 Atualizado diariamente
        </span>
      }
      left={
        <>
          <h1
            className="text-5xl leading-tight text-white lg:text-6xl duration-400
     duration-400
    hover:-scale-[-1.04]"
            style={{ fontFamily: "Audiowide" }}
          >
            ACHADINHOS
            <br />
            <span
              className="text-[#046AEE]  duration-400
   "
            >
              DA SEMANA
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-8 text-slate-400 duration-400
    hover:-scale-[-1.04]"
          >
            Descubra ofertas verificadas pela HikariBluWave nos maiores
            marketplaces, com descontos reais e produtos selecionados.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3  duration-400
    "
          >
            {["Mercado Livre", "Shopee", "Amazon", "Links Oficiais"].map(
              (item) => (
                <span
                  key={item}
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#263244]
                  bg-white/5
                  px-4
                  py-2
                  text-sm
                  text-slate-300
                   duration-400
    hover:-scale-[-1.08]
                "
                >
                  <ShieldCheck size={16} className="text-[#046AEE]  " />

                  {item}
                </span>
              ),
            )}
          </div>

          <div
            className="mt-10 flex gap-4  duration-400
    hover:-scale-[-1.04]"
          >
            <PrimaryButton>
              Explorar Ofertas
              <ArrowRight className="ml-2" size={18} />
            </PrimaryButton>
          </div>
        </>
      }
      right={<ArtAchadinhos />}
    />
  );
}
