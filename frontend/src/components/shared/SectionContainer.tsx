import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section className={`w-full  lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
