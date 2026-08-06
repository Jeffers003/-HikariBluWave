import { AlertCircle } from "lucide-react";

export default function PriceNotice() {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#046AEE]
          hover:shadow-[0_0_45px_rgba(4,106,238,.28)] mb-4"
    >
      <div className="mt-0.5 flex p-3 items-center justify-center rounded-full bg-blue-500/20">
        <AlertCircle className="h-5 w-5 text-blue-400" />
      </div>

      <div>
        <h3 className="font-semibold text-white">Aviso sobre preços</h3>

        <p className="mt-1 text-sm leading-6 text-slate-300">
          Os preços exibidos são informados no momento do cadastro e
          <span className="font-medium text-blue-400">
            {" "}
            podem sofrer alterações{" "}
          </span>
          diretamente no marketplace (Mercado Livre, Shopee ou AliExpress) sem
          aviso prévio. O valor final será o apresentado na página da oferta.
        </p>
      </div>
    </div>
  );
}
