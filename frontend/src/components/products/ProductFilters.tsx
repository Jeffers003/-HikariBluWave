import { Search } from "lucide-react";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function ProductFilters({
  search,
  setSearch,
}: ProductFiltersProps) {
  return (
    <div
      className="
        mb-10
        flex
        items-center
        rounded-2xl
        border
        border-[#263244]
        bg-[#111827]
        px-5
        py-4
        transition-all
        focus-within:border-[#046AEE]
        focus-within:shadow-[0_0_25px_rgba(4,106,238,.25)]
      "
    >
      <Search size={20} className="mr-3 text-slate-400" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar produtos..."
        className="
          w-full
          bg-transparent
          text-white
          outline-none
          placeholder:text-slate-500
        "
      />
    </div>
  );
}
