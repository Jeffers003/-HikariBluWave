import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ReviewForm from "@/pages/admin/reviews/ReviewForm";

import { criarReview } from "@/services/reviewService";

export default function NovoReview() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);

      await criarReview(formData);

      toast.success("Review criado com sucesso!");

      navigate("/admin/reviews");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao criar review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AdminPageHeader title="Novo Review" />

      <ReviewForm onSubmit={handleSubmit} loading={loading} />
    </>
  );
}
