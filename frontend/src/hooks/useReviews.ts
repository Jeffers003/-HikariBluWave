import { useEffect, useState } from "react";

import { listarReviews } from "@/services/reviewService";

import type { Review } from "@/types/review";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarReviews();
  }, []);

  async function carregarReviews() {
    try {
      const data = await listarReviews();

      setReviews(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    reviews,
    loading,
    atualizar: carregarReviews,
  };
}
