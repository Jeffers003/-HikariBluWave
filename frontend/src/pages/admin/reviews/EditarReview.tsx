import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ReviewForm from "@/pages/admin/reviews/ReviewForm";

import { buscarReview, atualizarReview } from "@/services/reviewService";

import type { Review } from "@/types/review";

export default function EditarReview() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [review, setReview] = useState<Review>();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarReview();
  }, []);

  async function carregarReview() {
    try {
      if (!id) return;

      const data = await buscarReview(id);

      setReview(data);
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar review.");

      navigate("/admin/reviews");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    try {
      if (!id) return;

      setSaving(true);

      await atualizarReview(id, formData);

      toast.success("Review atualizado com sucesso!");

      navigate("/admin/reviews");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao atualizar review.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AdminPageHeader title="Editar Review" />

      {review && (
        <ReviewForm
          initialData={review}
          onSubmit={handleSubmit}
          loading={saving}
        />
      )}
    </>
  );
}
