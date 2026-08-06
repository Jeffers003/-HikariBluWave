import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import api from "@/services/api";
import CategoryTable from "@/pages/admin/categories/CategoryTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";

import CategoryFormDialog from "@/pages/admin/categories/CategoryFormDialog";

interface Categoria {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
  ordem: number;
  ativo: boolean;
}

const initialForm = {
  nome: "",
  descricao: "",
  imagem: "",
  ordem: 0,
  ativo: true,
};

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [open, setOpen] = useState(false);

  const [editando, setEditando] = useState<Categoria | null>(null);

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      const resposta = await api.get("/categorias");

      setCategorias(resposta.data);
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar categorias.");
    }
  }

  function alterarCampo(
    campo: keyof typeof initialForm,
    valor: string | number | boolean,
  ) {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function abrirCriacao() {
    setEditando(null);

    setFormData(initialForm);

    setOpen(true);
  }

  function abrirEdicao(categoria: Categoria) {
    setEditando(categoria);

    setFormData({
      nome: categoria.nome,

      descricao: categoria.descricao || "",

      imagem: categoria.imagem || "",

      ordem: categoria.ordem || 0,

      ativo: categoria.ativo,
    });

    setOpen(true);
  }

  async function salvarCategoria() {
    try {
      if (editando) {
        await api.put(`/categorias/${editando._id}`, formData);

        toast.success("Categoria atualizada!");
      } else {
        await api.post("/categorias", formData);

        toast.success("Categoria criada!");
      }

      await buscarCategorias();

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Erro ao salvar categoria.");
    }
  }
  async function excluirCategoria(id: string) {
    try {
      await api.delete(`/categorias/${id}`);

      await buscarCategorias();

      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao excluir categoria.");
    }
  }
  return (
    <div>
      <AdminPageHeader title="Categorias">
        <Button onClick={abrirCriacao}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </AdminPageHeader>

      <div className="mt-8">
        <CategoryTable
          categorias={categorias}
          onEdit={abrirEdicao}
          onDelete={excluirCategoria}
        />
      </div>

      <CategoryFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editando ? "Editar Categoria" : "Nova Categoria"}
        formData={formData}
        onChange={alterarCampo}
        onSubmit={salvarCategoria}
      />
    </div>
  );
}
