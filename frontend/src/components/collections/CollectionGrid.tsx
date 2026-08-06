import CollectionCard from "./CollectionCard";

import type { Collection } from "@/types/collection";

interface Props {
  colecoes?: Collection[];
  limit?: number;
}

export default function CollectionGrid({ colecoes = [], limit }: Props) {
  const items = colecoes.slice(0, limit ?? colecoes.length);

  if (items.length === 0) {
    return (
      <div className="pt-20 text-center text-slate-400">
        Nenhuma coleção encontrada.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-8 py-20 pb-5">
      {items.map((colecao) => (
        <CollectionCard key={colecao.id} colecao={colecao} />
      ))}
    </section>
  );
}
