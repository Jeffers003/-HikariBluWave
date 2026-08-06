export default function SkeletonCard() {
  return (
    <div
      className="
      overflow-hidden
      rounded-3xl
      border
      border-[#030720d4]
      bg-[#142435]/60
      p-5
      animate-pulse
      "
    >
      <div
        className="
        mb-5
        h-5
        w-24
        rounded-full
        bg-slate-700
        "
      />

      <div
        className="
        h-64
        rounded-2xl
        bg-slate-800
        "
      />

      <div
        className="
        mt-5
        h-6
        w-3/4
        rounded
        bg-slate-700
        "
      />

      <div
        className="
        mt-4
        h-8
        w-1/2
        rounded
        bg-slate-700
        "
      />

      <div
        className="
        mt-6
        h-12
        w-full
        rounded-xl
        bg-slate-700
        "
      />
    </div>
  );
}
