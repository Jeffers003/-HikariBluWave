import { useEffect, useState } from "react";

import { listarReviewsPublicos } from "@/services/reviewService";

import type { Review } from "@/types/review";

export function useReviewsPublicos() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarReviews();
  }, []);

  async function carregarReviews() {
    try {
      const data = await listarReviewsPublicos();

      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    reviews,
    loading,
  };
}
