import HeroSection from "@/components/shared/HeroSection";
import Balloon from "@/components/Balloon";

interface Props {
  totalColecoes: number;
}

export default function HeroColecao({ totalColecoes }: Props) {
  return (
    <HeroSection
      badge={<Balloon />}
      left={
        <>
          <span className="tracking-[.35em] uppercase text-sky-300">
            HIKARIBLUWAVE
          </span>

          <h1
            className="mt-4 text-6xl uppercase text-white"
            style={{ fontFamily: "Audiowide" }}
          >
            Coleções
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Descubra coleções temáticas criadas pela HikariBluWave com os
            melhores achadinhos organizados por estilo, universo e categoria.
          </p>

          <div className="mt-10">
            <p className="text-5xl font-bold text-white">{totalColecoes}</p>

            <span className="text-slate-400">Coleções disponíveis</span>
          </div>
        </>
      }
      right={
        <img
          src="/images/collections/hero.png"
          alt="Coleções"
          className="max-h-[520px] object-contain"
        />
      }
    />
  );
}
