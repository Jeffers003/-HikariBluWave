import api from "@/services/api";

import type { Review } from "@/types/review";

export async function listarReviews() {
  const { data } = await api.get<Review[]>("/reviews");

  return data;
}

export async function listarReviewsPublicos() {
  const { data } = await api.get<Review[]>("/reviews/publicos");

  return data;
}

export async function buscarReview(id: string) {
  const { data } = await api.get<Review>(`/reviews/${id}`);

  return data;
}

export async function excluirReview(id: string) {
  await api.delete(`/reviews/${id}`);
}
export async function criarReview(formData: FormData) {
  const { data } = await api.post("/reviews", formData);

  return data;
}

export async function atualizarReview(id: string, formData: FormData) {
  const { data } = await api.put(`/reviews/${id}`, formData);

  return data;
}
