import type { ReactNode } from "react";
import SectionTitle from "./SectionTitle";

interface SectionHeaderProps {
  badge?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className=" p-4 flex flex-col gap-6 justify-center  lg:justify-between text-lg  font-bold text-white"
      style={{ fontFamily: "Audiowide, sans-serif" }}
    >
      <div>
        {badge && <div className="mb-3">{badge}</div>}

        <SectionTitle title={title} subtitle={subtitle} />
      </div>

      {action && (
        <div className="flex justify-start lg:justify-end">{action}</div>
      )}
    </div>
  );
}
