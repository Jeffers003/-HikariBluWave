import { ShoppingCart, Store, Package, Globe } from "lucide-react";

interface Props {
  selecionado: string;

  onChange: (valor: string) => void;
}

const marketplaces = [
  {
    nome: "Todos",
    icon: Globe,
  },

  {
    nome: "Mercado Livre",
    icon: ShoppingCart,
  },

  {
    nome: "Shopee",
    icon: Store,
  },

  {
    nome: "Amazon",
    icon: Package,
  },

  {
    nome: "AliExpress Brasil",
    icon: Globe,
  },
];

export default function MarketplaceFilter({
  selecionado,

  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {marketplaces.map((item) => {
        const Icon = item.icon;

        const ativo = selecionado === item.nome;

        return (
          <button
            key={item.nome}
            onClick={() => onChange(item.nome)}
            className={`
flex
items-center
gap-2
rounded-full
border
px-5
py-2.5
text-sm
transition-all
duration-300

${
  ativo
    ? "border-[#046AEE] bg-[#046AEE] text-white shadow-[0_0_25px_rgba(4,106,238,.35)]"
    : "border-[#263244] bg-white/5 text-slate-300 hover:border-[#046AEE] hover:text-white"
}

`}
          >
            <Icon size={16} />

            {item.nome}
          </button>
        );
      })}
    </div>
  );
}
