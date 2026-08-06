import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import { toast } from "sonner";

import AdminPageHeader from "../../components/admin/AdminPageHeader";

import AchadinhoForm, {
  type AchadinhoFormData,
} from "../../components/admin/AchadinhoForm";

export default function EditarAchadinho() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [dados, setDados] = useState<AchadinhoFormData | null>(null);

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarAchadinho();
  }, []);

  async function carregarAchadinho() {
    try {
      const response = await api.get(`/achadinhos/${id}`);

      const achadinho = response.data;

      setDados({
        titulo: achadinho.titulo,

        descricao: achadinho.descricao || "",

        categoria: achadinho.categoria?._id || achadinho.categoria || "",

        marketplace: achadinho.marketplace,

        preco: achadinho.preco,

        precoAntigo: achadinho.precoAntigo || 0,

        linkAfiliado: achadinho.linkAfiliado,

        destaque: achadinho.destaque,

        ativo: achadinho.ativo,

        tags: achadinho.tags || [],

        colecoes: achadinho.colecoes || [],
      });
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar achadinho.");
    }
  }

  async function atualizar(dadosFormulario: AchadinhoFormData) {
    try {
      setSalvando(true);

      const formData = new FormData();

      Object.entries(dadosFormulario).forEach(([campo, valor]) => {
        if (valor === undefined) return;

        if (campo === "colecoes" || campo === "tags") {
          formData.append(campo, JSON.stringify(valor));

          return;
        }

        formData.append(campo, valor as any);
      });

      await api.put(`/achadinhos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Achadinho atualizado!");

      navigate("/admin/achadinhos");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao atualizar achadinho.");
    } finally {
      setSalvando(false);
    }
  }

  if (!dados) {
    return <p>Carregando achadinho...</p>;
  }

  return (
    <>
      <AdminPageHeader title="Editar Achadinho" />

      <AchadinhoForm
        initialData={dados}
        loading={salvando}
        onSubmit={atualizar}
      />
    </>
  );
}
