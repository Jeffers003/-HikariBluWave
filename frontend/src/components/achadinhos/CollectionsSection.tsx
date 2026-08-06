import type { Collection } from "@/types/collection";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CollectionCard from "@/components/collections/CollectionCard";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeader from "@/components/shared/SectionHeader";

interface Props {
  colecoes?: Collection[];
}

export default function CollectionsSection({ colecoes = [] }: Props) {
  return (
    <SectionContainer className="flex w-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader title="COLEÇÕES" />

        <Link
          to="/colecoes"
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#046AEE]
            px-6
            py-3
            font-medium
            text-[#53A8FF]
            transition-all
            duration-300
            hover:bg-[#04081d]
            hover:text-white
            hover:shadow-[0_0_25px_rgba(4,106,238,.35)]
          "
        >
          Ver todas as Coleções
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8">
        {colecoes.length > 0 ? (
          colecoes.map((colecao) => (
            <CollectionCard key={colecao._id} colecao={colecao} />
          ))
        ) : (
          <div className="rounded-2xl border border-[#046AEE]/20 bg-[#070B14] py-12 text-center text-gray-400">
            Nenhuma coleção encontrada.
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
