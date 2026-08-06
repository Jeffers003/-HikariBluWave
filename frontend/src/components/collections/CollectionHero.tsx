import type { Collection } from "@/types/collection";

import HeroSection from "../shared/HeroSection";

interface Props {
  colecao: Collection;
  totalProdutos: number;
}

export default function CollectionHero({ colecao, totalProdutos }: Props) {
  return (
    <HeroSection
      badge={<div></div>}
      left={
        <>
          <span className="tracking-[.4em] text-sky-300 uppercase">
            COLEÇÃO
          </span>

          <h1
            className="mt-4 text-6xl uppercase text-white"
            style={{ fontFamily: "Audiowide" }}
          >
            {colecao.nome}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            {colecao.descricao}
          </p>

          <div className="mt-10">
            <p className="text-4xl font-bold text-white">{totalProdutos}</p>

            <span className="text-slate-400">Produtos nesta coleção</span>
          </div>
        </>
      }
      right={
        colecao.imagem ? (
          <img
            src={`http://localhost:3000${colecao.imagem}`}
            alt={colecao.nome}
            className="
              h-[520px]
              object-contain
              drop-shadow-[0_0_50px_rgba(4,106,238,.35)]
            "
          />
        ) : null
      }
    />
  );
}
