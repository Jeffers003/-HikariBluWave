import { SearchX } from "lucide-react";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface EmptyDealsStateProps {
  onClear?: () => void;
}

export default function EmptyDealsState({ onClear }: EmptyDealsStateProps) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-[#046AEE]/20
      bg-[#111827]/60
      p-12
      text-center
      "
    >
      <div
        className="
        mb-5
        rounded-full
        bg-[#046AEE]/10
        p-5
        text-[#3B82F6]
        "
      >
        <SearchX size={40} />
      </div>

      <h3
        className="
        text-2xl
        font-semibold
        text-white
        "
      >
        Nenhuma oferta encontrada
      </h3>

      <p
        className="
        mt-3
        max-w-md
        text-slate-400
        "
      >
        Não encontramos produtos com esses filtros. Tente buscar outro termo ou
        limpar os filtros.
      </p>

      {onClear && (
        <PrimaryButton className="mt-6" onClick={onClear}>
          Limpar filtros
        </PrimaryButton>
      )}
    </div>
  );
}
