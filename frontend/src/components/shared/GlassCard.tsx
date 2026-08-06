import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        `
        rounded-3xl
        border
        border-[#26324469]
        bg-white/5
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,.25)]
        transition-all
        duration-300
        `,
        hover &&
          `
          hover:-translate-y-1
          hover:border-[#046AEE]/60
          hover:shadow-[0_0_35px_rgba(4,106,238,.18)]
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
