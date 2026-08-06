import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GlassCard from "@/components/shared/GlassCard";
import PrimaryButton from "@/components/shared/PrimaryButton";

import type { Collection } from "@/types/collection";

interface Props {
  colecao: Collection;
}

export default function CollectionCard({ colecao }: Props) {
  const navigate = useNavigate();

  return (
    <GlassCard
      className="
        group
        relative
        overflow-hidden
        border-[#0D3D8F]
        bg-gradient-to-b
        from-[#01081D]
        to-[#03051C]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_0_45px_rgba(4,106,238,.25)]
      "
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at left, rgba(4,106,238,.25), transparent 60%)",
        }}
      />

      <div
        className="
          absolute
          -left-32
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          blur-[130px]
          bg-[#046AEE]/30
        "
      />

      <div
        className="relative z-10 flex min-h-[220px] justify-between p-8"
        style={{ fontFamily: "Audiowide" }}
      >
        <div className="flex max-w-xl flex-col gap-5">
          <span className="text-xs uppercase tracking-[.35em] text-sky-300">
            COLEÇÃO
          </span>

          <h2 className="text-5xl font-black uppercase text-white">
            {colecao.nome}
          </h2>

          {colecao.descricao && (
            <p className="text-lg leading-8 text-slate-300">
              {colecao.descricao}
            </p>
          )}

          <PrimaryButton
            className="mt-4 flex items-center gap-2"
            onClick={() => navigate(`/colecoes/${colecao.slug}`)}
          >
            Explorar coleção
            <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>

      {colecao.imagem && (
        <div
          className="
            absolute
            bottom-0
            right-0
            hidden
            h-full
            w-[45%]
            items-end
            justify-end
            overflow-hidden
            lg:flex
          "
        >
          <img
            src={`http://localhost:3000${colecao.imagem}`}
            alt={colecao.nome}
            className="
              max-h-full
              max-w-[80%]
              object-contain
              transition-all
              duration-500
              group-hover:scale-105
            "
          />
        </div>
      )}
    </GlassCard>
  );
}
