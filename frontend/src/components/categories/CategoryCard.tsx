import GlassCard from "@/components/shared/GlassCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  nome: string;
  imagem: string;
  href: string;
  icon?: React.ReactNode;
}

export default function CategoryCard({
  nome,
  imagem,
  href,
  icon,
}: CategoryCardProps) {
  return (
    <Link to={href}>
      <GlassCard
        className="
          group
          relative
          aspect-square
          overflow-hidden
          rounded-3xl
          border border-[#10284B]
          bg-gradient-to-b
from-[#010208]
to-[#000813]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#046AEE]
          hover:shadow-[0_0_45px_rgba(4,106,238,.28)]
          
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle,#012051,transparent_80%)]
            opacity-28
            transition-opacity
            duration-500
            group-hover:opacity-90
          "
        />
        <div
          className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_50%_25%,rgba(4,106,238,.20),transparent_65%)]
  "
        />
        {/* Imagem */}
        <div className="relative flex h-[75%] items-center justify-center overflow-hidden">
          <img
            src={imagem}
            alt={nome}
            className="
    relative
    h-52
    max-h-50
    p-8
    object-contain
    transition-all
    duration-500
    ease-out
    group-hover:-translate-y-2
    group-hover:scale-105
    drop-shadow-[0_20px_35px_rgba(0,0,0,.45)]
"
          />
        </div>

        {/* Rodapé */}
        <div className="relative flex h-[35%] items-end justify-between p-6">
          <div>
            <div className="mb-2 flex items-center gap-1">
              {icon}

              <h3 className="font-audiowide text-lg text-white">{nome}</h3>
            </div>

            <span
              className="
        
        inline-flex
        items-center
        gap-2
        text-sm
        font-medium
        text-[#3B82F6]
        transition-all
        duration-300
        group-hover:gap-3
    "
            >
              Explorar
              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
