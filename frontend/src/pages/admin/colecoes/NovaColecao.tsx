import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "@/services/api";

import { toast } from "sonner";

import AdminPageHeader from "@/components/admin/AdminPageHeader";

import ColecaoForm, { type ColecaoFormData } from "./ColecaoForm";

export default function NovaColecao() {
  const navigate = useNavigate();

  const [salvando, setSalvando] = useState(false);

  async function salvar(dados: ColecaoFormData) {
    try {
      setSalvando(true);

      const formData = new FormData();

      formData.append("nome", dados.nome);

      formData.append("slug", dados.slug);

      formData.append("descricao", dados.descricao);

      formData.append("ativo", String(dados.ativo));

      if (dados.imagemArquivo) {
        formData.append("imagem", dados.imagemArquivo);
      }

      await api.post("/colecoes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Coleção criada!");

      navigate("/admin/colecoes");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao criar coleção.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <AdminPageHeader title="Nova Coleção" />

      <ColecaoForm loading={salvando} onSubmit={salvar} />
    </>
  );
}
