import { ShoppingCart, Store, Package, Globe } from "lucide-react";

interface Props {
  marketplace: string;
}

const marketplaces = {
  "Mercado Livre": {
    icon: ShoppingCart,
    label: "Mercado Livre",
  },
  Shopee: {
    icon: Store,
    label: "Shopee",
  },
  Amazon: {
    icon: Package,
    label: "Amazon",
  },
  "AliExpress Brasil": {
    icon: Globe,
    label: "AliExpress",
  },
};

export default function MarketplaceBadge({ marketplace }: Props) {
  const data = marketplaces[marketplace as keyof typeof marketplaces];

  const Icon = data?.icon ?? Globe;

  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-[#263244]
      bg-white/5
      px-3
      py-1.5
      text-xs
      text-slate-300
       duration-400
    hover:-scale-[-1.04]
    "
    >
      <Icon size={14} />

      {data?.label ?? marketplace}
    </div>
  );
}
