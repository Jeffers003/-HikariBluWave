import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DiscountBadge from "@/components/shared/DiscountBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import api from "../../services/api";
import MarketplaceBadge from "@/components/admin/MarketplaceBadge";
import { Pencil, Trash2, Plus, ImageOff } from "lucide-react";

import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { ConfirmDeleteDialog } from "../../components/admin/ConfirmDeleteDialog";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

import type { Achadinho } from "@/types/achadinho";

export default function AchadinhosAdmin() {
  const navigate = useNavigate();

  const [achadinhos, setAchadinhos] = useState<Achadinho[]>([]);

  useEffect(() => {
    carregarAchadinhos();
  }, []);

  async function carregarAchadinhos() {
    try {
      const response = await api.get("/achadinhos");

      setAchadinhos(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar achadinhos.");
    }
  }

  async function excluirAchadinho(id: string) {
    try {
      await api.delete(`/achadinhos/${id}`);

      setAchadinhos((lista) => lista.filter((item) => item._id !== id));

      toast.success("Achadinho excluído!");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao excluir.");
    }
  }

  return (
    <>
      <AdminPageHeader title="Achadinhos">
        <Button className="p-5">
          <Link className="flex items-center" to="/admin/achadinhos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Achadinho
          </Link>
        </Button>
      </AdminPageHeader>

      <div className="rounded-xl border border-[#046AEE]/20  bg-[#070B14] p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white ">Produto</TableHead>

              <TableHead className="text-white ">Marketplace</TableHead>
              <TableHead className="text-white text-start">Coleções</TableHead>

              <TableHead className="text-white ">Preço</TableHead>
              <TableHead className="text-white ">Desconto</TableHead>

              <TableHead className="text-white text-center">Destaque</TableHead>

              <TableHead className="text-white ">Status</TableHead>

              <TableHead className="text-white">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {achadinhos.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {item.imagem ? (
                      <div className="group relative">
                        <img
                          src={`http://localhost:3000${item.imagem}`}
                          className="
        w-16
        h-16
        rounded-xl
        object-cover
        border
        border-[#046AEE]/30
        shadow-lg
        transition
        duration-300
        group-hover:scale-110
      "
                        />
                      </div>
                    ) : (
                      <div
                        className="
      w-16
      
      h-16
      rounded-xl
      flex
      items-center
      justify-center
      bg-[#153f9a]
      border
      border-[#263244]
    "
                      >
                        <ImageOff className="text-gray-500" />
                      </div>
                    )}

                    <span className="">{item.titulo}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <MarketplaceBadge marketplace={item.marketplace} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.colecoes?.length ? (
                      item.colecoes.map((colecao) => (
                        <Badge
                          key={colecao}
                          variant="outline"
                          className="border-[#046AEE]/40 text-blue-300"
                        >
                          {colecao}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {item.precoAntigo && item.precoAntigo > item.preco && (
                      <div className="text-sm text-gray-400 line-through">
                        R$ {item.precoAntigo.toFixed(2)}
                      </div>
                    )}

                    <div className="font-bold text-white">
                      R$ {item.preco.toFixed(2)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <DiscountBadge
                    precoAntigo={item.precoAntigo ?? item.preco}
                    precoAtual={item.preco}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {item.destaque ? (
                    <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      ⭐ Destaque
                    </Badge>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </TableCell>

                <TableCell>
                  <StatusBadge ativo={item.ativo} />
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      onClick={() =>
                        navigate(`/admin/achadinhos/editar/${item._id}`)
                      }
                    >
                      <Pencil size={18} />
                    </Button>

                    <ConfirmDeleteDialog
                      title="Excluir achadinho?"
                      description="Essa ação não poderá ser desfeita."
                      onConfirm={() => excluirAchadinho(item._id)}
                    >
                      <Button size="icon" variant="destructive">
                        <Trash2 size={18} />
                      </Button>
                    </ConfirmDeleteDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
