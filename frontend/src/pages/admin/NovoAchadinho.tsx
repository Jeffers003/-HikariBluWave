import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { toast } from "sonner";

import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AchadinhoForm, {
  type AchadinhoFormData,
} from "../../components/admin/AchadinhoForm";

export default function NovoAchadinho() {
  const navigate = useNavigate();

  const [salvando, setSalvando] = useState(false);

  async function salvarAchadinho(dados: AchadinhoFormData) {
    if (!dados.titulo.trim()) {
      toast.warning("Informe o título do achadinho.");
      return;
    }

    if (!dados.linkAfiliado.trim()) {
      toast.warning("Informe o link de afiliado.");
      return;
    }
    try {
      setSalvando(true);

      const formData = new FormData();

      formData.append("titulo", dados.titulo);

      formData.append("descricao", dados.descricao);

      formData.append("categoria", dados.categoria);

      formData.append("tags", JSON.stringify(dados.tags ?? []));

      formData.append("colecoes", JSON.stringify(dados.colecoes ?? []));
      formData.append("marketplace", dados.marketplace);

      formData.append("preco", String(dados.preco));

      formData.append("precoAntigo", String(dados.precoAntigo));

      formData.append("linkAfiliado", dados.linkAfiliado);

      formData.append("destaque", String(dados.destaque));

      formData.append("ativo", String(dados.ativo));

      if (dados.imagemArquivo) {
        formData.append("imagem", dados.imagemArquivo);
      }

      await api.post("/achadinhos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Achadinho cadastrado!");

      navigate("/admin/achadinhos");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao cadastrar achadinho.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <AdminPageHeader title="Novo Achadinho" />

      <AchadinhoForm loading={salvando} onSubmit={salvarAchadinho} />
    </>
  );
}
