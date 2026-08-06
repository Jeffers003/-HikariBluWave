import { Star } from "lucide-react";

import GlassCard from "@/components/shared/GlassCard";

import type { Review } from "@/types/review";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const avatar = review.avatar
    ? `${import.meta.env.VITE_API_URL}${review.avatar}`
    : "/images/avatar-default.png";

  return (
    <GlassCard
      className="
        p-6
        bg-[#01081D]
        border-[#0D3D8F]
        rounded-lg
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={review.nome}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-white">{review.nome}</h3>

          <p className="text-sm text-slate-400">{review.cargo || "Cliente"}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: review.nota }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="mt-5 leading-7 text-slate-300 italic">
        "{review.comentario}"
      </p>
    </GlassCard>
  );
}
