import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "../../services/api";
import { toast } from "sonner";

export default function NovoProduto() {
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    carregarCategorias();
  }, []);
  function selecionarImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImagem(file);

    setPreview(URL.createObjectURL(file));
  }
  async function salvarProduto(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", preco);
      formData.append("estoque", estoque);
      formData.append("categoria", categoria);

      if (imagem) {
        formData.append("imagem", imagem);
      }

      console.log("Enviando produto...");

      const response = await api.post("/produtos", formData);

      console.log(response.data);

      toast.success("Produto cadastrado com sucesso!");

      // Limpa o formulário
      setNome("");
      setDescricao("");
      setPreco("");
      setEstoque("");
      setCategoria("");
      setImagem(null);
      setPreview("");
    } catch (error: any) {
      console.error(error);

      console.log("Status:", error.response?.status);
      console.log("Resposta:", error.response?.data);

      toast.error("Erro ao criar um novo produto.");
    }
  }
  return (
    <div className="mx-auto mt-35 max-w-4xl">
      <h1
        className="mb-8 text-3xl text-[#046AEE]"
        style={{ fontFamily: "Audiowide" }}
      >
        Novo Produto
      </h1>

      <div className="rounded-xl border border-[#046AEE]/20 bg-[#070B14] p-8">
        <form onSubmit={salvarProduto} className="space-y-6">
          <div>
            <Label>Nome</Label>

            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="space-y-3">
            <Label>Imagem do Produto</Label>

            <div className="flex items-center gap-6">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-xl border border-[#046AEE]/20 object-cover"
                />
              ) : (
                <div
                  className="
        flex
        h-32
        w-32
        items-center
        justify-center
        rounded-xl
        border-2
        border-dashed
        border-[#046AEE]/30
        bg-[#0B1324]
        text-gray-500
      "
                >
                  Sem imagem
                </div>
              )}

              <input type="file" accept="image/*" onChange={selecionarImagem} />
            </div>
          </div>
          <div>
            <Label>Descrição</Label>

            <Textarea
              rows={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <Label>Categoria</Label>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="
      mt-2
      w-full
      rounded-md
      border
      border-[#046AEE]/20
      bg-[#0B1324]
      p-3
      text-white
      outline-none
      focus:border-[#046AEE]
    "
            >
              <option value="">Selecione uma categoria</option>

              {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Preço</Label>

              <Input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>

            <div>
              <Label>Estoque</Label>

              <Input
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Salvar Produto
          </Button>
        </form>
      </div>
    </div>
  );
}
