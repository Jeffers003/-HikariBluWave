import ReviewCard from "@/components/reviews/ReviewCard";

import SectionContainer from "../shared/SectionContainer";
import SectionHeader from "../shared/SectionHeader";

import { useReviewsPublicos } from "@/hooks/useReviewsPublicos";

export default function Reviews() {
  const { reviews, loading } = useReviewsPublicos();

  if (loading) {
    return null; // ou um Skeleton futuramente
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <SectionContainer className="flex w-full flex-col">
      <SectionHeader title="O QUE NOSSOS CLIENTES DIZEM" />

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </SectionContainer>
  );
}
