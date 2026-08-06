interface MarketplaceBadgeProps {
  marketplace: string;
}

export default function MarketplaceBadge({
  marketplace,
}: MarketplaceBadgeProps) {
  const styles: Record<string, string> = {
    "Mercado Livre": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",

    Shopee: "bg-orange-500/20 text-orange-400 border-orange-500/30",

    Amazon: "bg-blue-500/20 text-blue-400 border-blue-500/30",

    "AliExpress Brasil": "bg-red-500/20 text-red-400 border-red-500/30",

    Outro: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        border

        ${styles[marketplace] || styles.Outro}
      `}
    >
      🛒 {marketplace}
    </span>
  );
}
