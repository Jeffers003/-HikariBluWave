import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";
import StatusBadge from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2, Plus, Star } from "lucide-react";

import { excluirReview } from "@/services/reviewService";
import { useReviews } from "@/hooks/useReviews";

export default function Reviews() {
  const { reviews, loading, atualizar } = useReviews();

  const [reviewExcluir, setReviewExcluir] = useState<string | null>(null);

  async function handleExcluir() {
    if (!reviewExcluir) return;

    try {
      await excluirReview(reviewExcluir);

      toast.success("Review removido com sucesso!");

      setReviewExcluir(null);

      atualizar();
    } catch {
      toast.error("Erro ao excluir review.");
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AdminPageHeader title="Reviews">
        <Button asChild>
          <Link to="/admin/reviews/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Review
          </Link>
        </Button>
      </AdminPageHeader>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  review.avatar
                    ? `${import.meta.env.VITE_API_URL}${review.avatar}`
                    : "/avatar.png"
                }
                alt={review.nome}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">{review.nome}</h3>

                <p className="text-sm text-gray-400">
                  {review.cargo || "Cliente"}
                </p>
              </div>
            </div>

            <div className="flex mt-4 gap-1">
              {Array.from({ length: review.nota }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="text-sm text-gray-300 mt-4 line-clamp-4">
              {review.comentario}
            </p>

            <div className="flex gap-2 mt-5">
              <StatusBadge status={review.ativo ? "Ativo" : "Inativo"} />

              {review.destaque && <StatusBadge status="Destaque" />}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button size="icon" variant="outline" asChild>
                <Link to={`/admin/reviews/${review._id}`}>
                  <Pencil size={18} />
                </Link>
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => setReviewExcluir(review._id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={!!reviewExcluir}
        onOpenChange={(open) => !open && setReviewExcluir(null)}
        onConfirm={handleExcluir}
      />
    </>
  );
}
