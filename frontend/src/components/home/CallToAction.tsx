import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GlassCard from "@/components/shared/GlassCard";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <GlassCard className="relative overflow-hidden p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0418ee]/10 via-transparent to-[#046AEE]/24" />

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white">
            Encontre seu próximo achadinho
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Descubra produtos selecionados das melhores lojas com ofertas,
            tecnologia e qualidade em um só lugar.
          </p>

          <PrimaryButton
            className="mt-10"
            onClick={() => navigate("/produtos")}
          >
            Explorar produtos
            <ArrowRight size={18} className="ml-2" />
          </PrimaryButton>
        </div>
      </GlassCard>
    </section>
  );
}
