import type { ReactNode } from "react";
import SectionContainer from "../shared/SectionContainer";
import GlassCard from "../shared/GlassCard";
import Bgachadinhos from "@/assets/images/Bg-achadinhos-2.png";
interface HeroSectionProps {
  badge?: ReactNode;
  left: ReactNode;
  right: ReactNode;
}

export default function HeroAchadinhosV2({
  badge,
  left,
  right,
}: HeroSectionProps) {
  return (
    <SectionContainer className="py-5 lg:py-16">
      <GlassCard className="relative overflow-hidden lg:p-14">
        {/* Glow esquerdo */}
        <div className="absolute inset-0 -z-10 bg-[#070B14]/55" />

        {/* Gradiente */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05070C] via-[#08111F]/40 to-transparent" />

        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-70 transition-all
"
          style={{
            backgroundImage: `url(${Bgachadinhos})`,
          }}
        ></div>

        {/* Glow direito */}
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-dark-400/30 blur-3xl" />

        <div className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            {badge && <div className="mb-6">{badge}</div>}

            {left}
          </div>

          <div className="flex justify-center">{right}</div>
        </div>
      </GlassCard>
    </SectionContainer>
  );
}
