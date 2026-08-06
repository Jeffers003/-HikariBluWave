import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import { Button } from "@/components/ui/button";
import FormSection from "./FormSection";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
interface Categoria {
  _id: string;
  nome: string;
}
interface Colecao {
  _id: string;

  nome: string;

  slug: string;
}
export interface AchadinhoFormData {
  titulo: string;

  descricao: string;

  categoria: string;

  marketplace: string;

  preco: number;

  precoAntigo: number;

  linkAfiliado: string;

  destaque: boolean;

  ativo: boolean;

  tags: string[];

  colecoes: string[];

  imagemArquivo?: File;
}

interface Props {
  initialData?: Partial<AchadinhoFormData>;
  loading?: boolean;
  onSubmit: (dados: AchadinhoFormData) => void;
}

export default function AchadinhoForm({
  initialData,
  loading,
  onSubmit,
}: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [dados, setDados] = useState<AchadinhoFormData>({
    titulo: "",

    descricao: "",

    categoria: "",

    marketplace: "Mercado Livre",

    preco: 0,

    precoAntigo: 0,

    linkAfiliado: "",

    destaque: false,

    ativo: true,

    tags: [],

    colecoes: [],
  });

  useEffect(() => {
    if (initialData) {
      setDados((old) => ({
        ...old,
        ...initialData,
      }));
    }
  }, [initialData]);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    buscarCategorias();
    buscarColecoes();
  }, []);

  async function buscarCategorias() {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function buscarColecoes() {
    try {
      const response = await api.get("/colecoes");

      setColecoes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  function alternarColecao(slug: string) {
    setDados((old) => ({
      ...old,

      colecoes: old.colecoes.includes(slug)
        ? old.colecoes.filter((item) => item !== slug)
        : [...old.colecoes, slug],
    }));
  }
  function atualizarCampo(campo: keyof AchadinhoFormData, valor: any) {
    setDados((old) => ({
      ...old,
      [campo]: valor,
    }));
  }

  const placeholderLink = useMemo(() => {
    switch (dados.marketplace) {
      case "Mercado Livre":
        return "Cole aqui seu link do Mercado Livre";

      case "Shopee":
        return "Cole aqui seu link da Shopee";

      case "Amazon":
        return "Cole aqui seu link da Amazon";

      case "AliExpress Brasil":
        return "Cole aqui seu link do AliExpress";

      default:
        return "Cole aqui o link da oferta";
    }
  }, [dados.marketplace]);

  return (
    <div className="space-y-6">
      <FormSection title="Informações Gerais">
        <div className="space-y-5 text-white/70">
          <div>
            <Label>Título</Label>

            <Input
              value={dados.titulo}
              onChange={(e) => atualizarCampo("titulo", e.target.value)}
              placeholder="Ex.: Mouse Gamer RGB"
            />
          </div>

          <div>
            <Label>Descrição</Label>

            <Textarea
              rows={5}
              value={dados.descricao}
              onChange={(e) => atualizarCampo("descricao", e.target.value)}
              placeholder="Descreva o produto..."
            />
          </div>

          <div>
            <Label>Categoria</Label>

            <Select
              value={dados.categoria}
              onValueChange={(value) => atualizarCampo("categoria", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>

              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria._id} value={categoria._id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>
      <FormSection title="Organização">
        <div className="space-y-5 text-white/70">
          <div>
            <Label>Tags</Label>

            <Input
              placeholder="Ex.: rgb, gamer, wireless"
              value={dados.tags.join(", ")}
              onChange={(e) =>
                atualizarCampo(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                )
              }
            />

            <p className="text-sm text-gray-400 mt-2">
              Separe as tags por vírgula.
            </p>
          </div>

          <div>
            <div>
              <Label>Coleções</Label>

              <div
                className="
    mt-3
    space-y-3
    rounded-xl
    border
    border-[#046AEE]/20
    bg-[#0B1220]
    p-4
  "
              >
                {colecoes.map((colecao) => (
                  <label
                    key={colecao._id}
                    onClick={() => alternarColecao(colecao.slug)}
                    className="
      flex
      cursor-pointer
      items-center
      gap-3
      rounded-lg
      p-2
      hover:bg-white/5
    "
                  >
                    <div
                      className={`
        h-5
        w-5
        rounded
        border
        flex
        items-center
        justify-center
        ${
          dados.colecoes.includes(colecao.slug)
            ? "bg-[#046AEE] border-[#046AEE]"
            : "border-gray-500"
        }
      `}
                    >
                      {dados.colecoes.includes(colecao.slug) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>

                    <span>{colecao.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-2">Selecione uma coleção.</p>
          </div>
        </div>
      </FormSection>
      <FormSection title="Oferta">
        <div className="space-y-5 text-white/70">
          <div>
            <Label>Marketplace</Label>

            <Select
              value={dados.marketplace}
              onValueChange={(value) => atualizarCampo("marketplace", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha o marketplace" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Mercado Livre">Mercado Livre</SelectItem>

                <SelectItem value="Shopee">Shopee</SelectItem>

                <SelectItem value="Amazon">Amazon</SelectItem>

                <SelectItem value="AliExpress Brasil">
                  AliExpress Brasil
                </SelectItem>

                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 md:grid-cols-2 ">
            <div>
              <Label>Preço atual</Label>

              <Input
                type="number"
                value={dados.preco}
                onChange={(e) =>
                  atualizarCampo("preco", Number(e.target.value))
                }
                placeholder="Ex.: 99.90"
              />
            </div>

            <div>
              <Label>Preço antigo</Label>

              <Input
                type="number"
                value={dados.precoAntigo}
                onChange={(e) =>
                  atualizarCampo("precoAntigo", Number(e.target.value))
                }
                placeholder="Ex.: 149.90"
              />
            </div>
          </div>

          <div>
            <Label>Link de afiliado</Label>

            <Input
              value={dados.linkAfiliado}
              onChange={(e) => atualizarCampo("linkAfiliado", e.target.value)}
              placeholder={placeholderLink}
            />
          </div>
        </div>
      </FormSection>
      <FormSection title="Imagem">
        <div className="space-y-5 text-white/70">
          <div>
            <Label>Imagem do achadinho</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const arquivo = e.target.files?.[0];

                if (!arquivo) return;

                atualizarCampo("imagemArquivo", arquivo);

                const imagemUrl = URL.createObjectURL(arquivo);

                setPreview(imagemUrl);
              }}
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-400">Preview:</p>

              <img
                src={preview}
                alt="Preview"
                className="
            h-40
            w-40
            rounded-xl
            border
            border-[#046AEE]/30
            object-cover
          "
              />
            </div>
          )}
        </div>
      </FormSection>
      <FormSection title="Configurações">
        <div className="space-y-5 text-white">
          <div className="flex items-center justify-between rounded-lg border border-[#046AEE]/20 bg-[#0B1220] p-4">
            <div>
              <Label className="text-base">Produto em destaque</Label>

              <p className="text-sm text-gray-400">
                Exibir este produto como um achadinho destacado.
              </p>
            </div>

            <Switch
              checked={dados.destaque}
              onCheckedChange={(valor) => atualizarCampo("destaque", valor)}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#046AEE]/20 bg-[#0B1220] p-4">
            <div>
              <Label className="text-base">Oferta ativa</Label>

              <p className="text-sm text-gray-400">
                Permitir que este achadinho apareça na loja.
              </p>
            </div>

            <Switch
              checked={dados.ativo}
              onCheckedChange={(valor) => atualizarCampo("ativo", valor)}
            />
          </div>
        </div>
      </FormSection>

      <Button
        className="w-full p-6 text-lg"
        onClick={() => onSubmit(dados)}
        disabled={loading}
      >
        {loading ? "Salvando..." : "Salvar Achadinho"}
      </Button>
    </div>
  );
}
