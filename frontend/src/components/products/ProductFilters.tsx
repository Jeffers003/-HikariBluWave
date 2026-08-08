import { Search } from "lucide-react";
import type { Categoria } from "@/types/categoria";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  categorias: Categoria[];
  categoriaAtiva: string | null;
  setCategoriaAtiva: (id: string | null) => void;
}

export default function ProductFilters({
  search,
  setSearch,
  categorias,
  categoriaAtiva,
  setCategoriaAtiva,
}: ProductFiltersProps) {
  return (
    <div className="mb-10 space-y-4">
      <div
        className="
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

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoriaAtiva(null)}
          className={`
            rounded-full
            border
            px-4
            py-1.5
            text-sm
            transition-all
            ${
              categoriaAtiva === null
                ? "border-[#046AEE] bg-[#046AEE]/15 text-[#046AEE]"
                : "border-[#263244] text-slate-400 hover:border-[#046AEE]/50"
            }
          `}
        >
          Todas
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria._id}
            onClick={() => setCategoriaAtiva(categoria._id)}
            className={`
              rounded-full
              border
              px-4
              py-1.5
              text-sm
              transition-all
              ${
                categoriaAtiva === categoria._id
                  ? "border-[#046AEE] bg-[#046AEE]/15 text-[#046AEE]"
                  : "border-[#263244] text-slate-400 hover:border-[#046AEE]/50"
              }
            `}
          >
            {categoria.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
