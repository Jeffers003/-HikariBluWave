interface Props {
  atual: number;
  antigo?: number;
}

export default function Price({ atual, antigo }: Props) {
  return (
    <div className="space-y-1">
      {antigo && (
        <p className="text-sm text-slate-500 line-through">
          R$ {antigo.toFixed(2)}
        </p>
      )}

      <p className="text-3xl font-bold text-[#3B82F6]">R$ {atual.toFixed(2)}</p>
    </div>
  );
}
