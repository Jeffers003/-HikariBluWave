import GlassCard from "@/components/shared/GlassCard";
import SectionContainer from "@/components/shared/SectionContainer";
import { ShieldCheck, Zap, Link2 } from "lucide-react";
import { motion } from "framer-motion";
const benefits = [
  {
    icon: ShieldCheck,
    title: "Ofertas verificadas",
    description: "Selecionamos apenas ofertas reais e atualizadas diariamente.",
  },
  {
    icon: Zap,
    title: "Até 70% OFF",
    description: "Encontre descontos incríveis em tecnologia e acessórios.",
  },
  {
    icon: Link2,
    title: "Links oficiais",
    description: "Você compra diretamente no marketplace com total segurança.",
  },
];

export default function BenefitsBar() {
  return (
    <SectionContainer className="py-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
        }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <GlassCard key={item.title} className="p-6">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#046AEE]/10">
                  <Icon className="text-[#3B82F6]" size={28} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
