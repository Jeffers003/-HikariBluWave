import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "@/services/api";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus, Pencil, Trash2 } from "lucide-react";

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";

interface Colecao {
  _id: string;

  nome: string;

  slug: string;

  descricao?: string;

  ativo: boolean;

  imagem?: string;
}

export default function ColecoesAdmin() {
  const navigate = useNavigate();

  const [colecoes, setColecoes] = useState<Colecao[]>([]);

  useEffect(() => {
    carregarColecoes();
  }, []);

  async function carregarColecoes() {
    try {
      const response = await api.get("/colecoes");

      setColecoes(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar coleções.");
    }
  }

  async function excluirColecao(id: string) {
    try {
      await api.delete(`/colecoes/${id}`);

      setColecoes((lista) => lista.filter((item) => item._id !== id));

      toast.success("Coleção excluída!");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao excluir coleção.");
    }
  }

  return (
    <>
      <AdminPageHeader title="Coleções">
        <Button>
          <Link className="flex items-center" to="/admin/colecoes/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Coleção
          </Link>
        </Button>
      </AdminPageHeader>

      <div
        className="
rounded-xl
border
border-[#046AEE]/20
bg-[#070B14]
p-4
"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Nome</TableHead>

              <TableHead className="text-white">Slug</TableHead>

              <TableHead className="text-white">Status</TableHead>

              <TableHead className="text-white">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {colecoes.map((colecao) => (
              <TableRow key={colecao._id}>
                <TableCell className="text-white">{colecao.nome}</TableCell>

                <TableCell className="text-gray-400">{colecao.slug}</TableCell>

                <TableCell className="text-white">
                  {colecao.ativo ? "Ativa" : "Inativa"}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      onClick={() =>
                        navigate(`/admin/colecoes/editar/${colecao._id}`)
                      }
                    >
                      <Pencil size={18} />
                    </Button>

                    <ConfirmDeleteDialog
                      title="Excluir coleção?"
                      description="Essa ação não poderá ser desfeita."
                      onConfirm={() => excluirColecao(colecao._id)}
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
