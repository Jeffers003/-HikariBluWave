interface HeroImageProps {
  src: string;
  alt: string;
}

export default function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="relative flex justify-center">
      <div
        className="
        absolute
        h-80
        w-80
        rounded-full
        bg-[#046AEE]/20
        blur-3xl
      "
      />

      <img
        src={src}
        alt={alt}
        className="
          relative
          w-full
          max-w-lg
          drop-shadow-[0_0_45px_rgba(4,106,238,.45)]
          transition-transform
          duration-500
          hover:scale-105
        "
      />
    </div>
  );
}
