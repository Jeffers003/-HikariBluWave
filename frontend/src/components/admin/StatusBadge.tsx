interface StatusBadgeProps {
  ativo: boolean;
}

export default function StatusBadge({ ativo }: StatusBadgeProps) {
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

        ${
          ativo
            ? `
              bg-green-500/20
              text-green-400
              border-green-500/30
            `
            : `
              bg-gray-500/20
              text-gray-400
              border-gray-500/30
            `
        }
      `}
    >
      {ativo ? "🟢 Ativo" : "⚪ Inativo"}
    </span>
  );
}
