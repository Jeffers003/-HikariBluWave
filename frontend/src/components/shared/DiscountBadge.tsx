import { calculateDiscount } from "@/utils/calculateDiscount";

interface DiscountBadgeProps {
  precoAntigo: number;
  precoAtual: number;
}

export default function DiscountBadge({
  precoAntigo,
  precoAtual,
}: DiscountBadgeProps) {
  const desconto = calculateDiscount(precoAtual, precoAntigo);

  if (desconto <= 0) {
    return null;
  }

  return (
    <span
      className="
      inline-flex
      items-center
      rounded-full
      bg-blue-500/20
      px-3
      py-1
      text-xs
      font-semibold
      text-blue-400
      border
      border-blue-500/30
      "
    >
      🔥 -{desconto}%
    </span>
  );
}
