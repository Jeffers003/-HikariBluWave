import SkeletonCard from "./SkeletonCard";

interface SkeletonGridProps {
  quantidade?: number;
}

export default function SkeletonGrid({ quantidade = 6 }: SkeletonGridProps) {
  return (
    <div
      className="
grid
gap-8
sm:grid-cols-2
xl:grid-cols-3
"
    >
      {Array.from({
        length: quantidade,
      }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
