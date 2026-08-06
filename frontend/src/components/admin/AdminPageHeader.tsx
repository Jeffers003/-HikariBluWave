import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function AdminPageHeader({
  title,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="mt-30 mb-8 flex items-center justify-between">
      <h1
        className="text-3xl text-[#046AEE]"
        style={{ fontFamily: "Audiowide" }}
      >
        {title}
      </h1>

      {children}
    </div>
  );
}
