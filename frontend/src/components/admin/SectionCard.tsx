import type { ReactNode } from "react";

interface SectionCardProps {
  titulo: string;
  children: ReactNode;
}

export default function SectionCard({ titulo, children }: SectionCardProps) {
  return (
    <div className="rounded-xl border border-[#046AEE]/20 bg-[#070B14] p-5 shadow-lg">
      <h2
        className="mb-4 text-xl text-[#046AEE]"
        style={{ fontFamily: "Audiowide" }}
      >
        {titulo}
      </h2>

      {children}
    </div>
  );
}
