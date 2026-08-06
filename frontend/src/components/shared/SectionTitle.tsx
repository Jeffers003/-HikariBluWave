interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2
        className="text-1xl text-white lg:text-1xl"
        style={{ fontFamily: "Enter the Grid 2" }}
      >
        {title}
      </h2>

      {subtitle && <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}
