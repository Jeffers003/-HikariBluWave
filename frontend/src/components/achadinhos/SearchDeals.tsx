import { Search } from "lucide-react";

interface Props {
  valor: string;

  onChange: (value: string) => void;
}

export default function SearchDeals({ valor, onChange }: Props) {
  return (
    <div
      className="
relative
w-full
"
    >
      <Search
        className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
      />

      <input
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar ofertas..."
        className="
w-full
rounded-xl
border
border-[#263244]
bg-[#111827]
py-4
pl-12
pr-4
text-white
outline-none
transition

focus:border-[#046AEE]

"
      />
    </div>
  );
}
