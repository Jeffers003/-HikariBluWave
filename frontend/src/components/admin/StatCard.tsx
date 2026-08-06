import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  titulo: string;
  valor: string | number;
  Icone: LucideIcon;

  descricao?: string;

  corIcone?: string;

  corValor?: string;
}

export default function StatCard({
  titulo,
  valor,
  Icone,
  descricao,
  corIcone = "#046AEE",
  corValor = "#046AEE",
}: StatCardProps) {
  return (
    <Card className="border border-[#046AEE]/30 bg-[#070B14] shadow-lg shadow-[#046AEE]/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#046AEE] hover:shadow-[#046AEE]/20">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-gray-400">{titulo}</p>

          <h2
            className="mt-2 text-3xl"
            style={{
              fontFamily: "Audiowide",
              color: corValor,
            }}
          >
            {valor}
          </h2>

          {descricao && (
            <p className="mt-2 text-xs text-gray-500">{descricao}</p>
          )}
        </div>

        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: `${corIcone}20`,
          }}
        >
          <Icone
            size={34}
            style={{
              color: corIcone,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
