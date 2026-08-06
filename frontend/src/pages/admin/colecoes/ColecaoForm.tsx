import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import FormSection from "@/components/admin/FormSection";

export interface ColecaoFormData {
  nome: string;

  slug: string;

  descricao: string;

  ativo: boolean;

  imagemArquivo?: File;
}

interface Props {
  initialData?: Partial<ColecaoFormData>;

  loading?: boolean;

  onSubmit: (dados: ColecaoFormData) => void;
}

export default function ColecaoForm({ initialData, loading, onSubmit }: Props) {
  const [dados, setDados] = useState<ColecaoFormData>({
    nome: "",
    slug: "",
    descricao: "",
    ativo: true,
  });

  useEffect(() => {
    if (initialData) {
      setDados((old) => ({
        ...old,
        ...initialData,
      }));
    }
  }, [initialData]);

  function atualizarCampo(campo: keyof ColecaoFormData, valor: any) {
    setDados((old) => ({
      ...old,
      [campo]: valor,
    }));
  }

  return (
    <div className="space-y-6">
      <FormSection title="Informações da Coleção">
        <div className="space-y-5 text-white/70">
          <div>
            <Label>Nome</Label>

            <Input
              value={dados.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
              placeholder="Ex: Setup Gamer"
            />
          </div>

          <div>
            <Label>Slug</Label>

            <Input
              value={dados.slug}
              onChange={(e) => atualizarCampo("slug", e.target.value)}
              placeholder="setup-gamer"
            />
          </div>

          <div>
            <Label>Descrição</Label>

            <Textarea
              rows={5}
              value={dados.descricao}
              onChange={(e) => atualizarCampo("descricao", e.target.value)}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Imagem">
        <Label>Imagem da coleção</Label>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const arquivo = e.target.files?.[0];

            if (arquivo) {
              atualizarCampo("imagemArquivo", arquivo);
            }
          }}
        />
      </FormSection>

      <Button
        className="w-full p-6 text-lg"
        disabled={loading}
        onClick={() => onSubmit(dados)}
      >
        {loading ? "Salvando..." : "Salvar Coleção"}
      </Button>
    </div>
  );
}
