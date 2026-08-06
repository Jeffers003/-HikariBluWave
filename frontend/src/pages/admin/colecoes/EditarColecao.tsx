import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "@/services/api";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";

import ColecaoForm, { type ColecaoFormData } from "./ColecaoForm";

export default function EditarColecao() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [dados, setDados] = useState<ColecaoFormData | null>(null);

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarColecao();
  }, []);

  async function carregarColecao() {
    try {
      const response = await api.get(`/colecoes/${id}`);

      const colecao = response.data;

      setDados({
        nome: colecao.nome,
        slug: colecao.slug,
        descricao: colecao.descricao || "",
        ativo: colecao.ativo,
      });
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar coleção.");
    }
  }

  async function atualizar(dadosFormulario: ColecaoFormData) {
    try {
      setSalvando(true);

      const formData = new FormData();

      formData.append("nome", dadosFormulario.nome);

      formData.append("slug", dadosFormulario.slug);

      formData.append("descricao", dadosFormulario.descricao);

      formData.append("ativo", String(dadosFormulario.ativo));

      if (dadosFormulario.imagemArquivo) {
        formData.append("imagem", dadosFormulario.imagemArquivo);
      }

      await api.put(`/colecoes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Coleção atualizada!");

      navigate("/admin/colecoes");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao atualizar coleção.");
    } finally {
      setSalvando(false);
    }
  }

  if (!dados) {
    return <p className="text-white">Carregando coleção...</p>;
  }

  return (
    <>
      <AdminPageHeader title="Editar Coleção" />

      <ColecaoForm
        initialData={dados}
        loading={salvando}
        onSubmit={atualizar}
      />
    </>
  );
}
