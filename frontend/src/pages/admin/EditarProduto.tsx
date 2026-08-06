import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "sonner";
export default function EditarProduto() {
  const { id } = useParams();

  const [produto, setProduto] = useState<any>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [salvando, setSalvando] = useState(false);
  useEffect(() => {
    async function buscarProduto() {
      try {
        const resposta = await api.get(`/produtos/${id}`);

        setProduto(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    }

    if (id) {
      buscarProduto();
    }

    async function buscarCategorias() {
      try {
        const resposta = await api.get("/categorias");

        setCategorias(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    buscarCategorias();
  }, [id]);

  function atualizarCampo(campo: string, valor: any) {
    setProduto({
      ...produto,
      [campo]: valor,
    });
  }

  if (!produto) {
    return <p>Carregando produto...</p>;
  }
  async function salvarProduto() {
    try {
      setSalvando(true);

      const formData = new FormData();

      formData.append("nome", produto.nome);

      formData.append("descricao", produto.descricao);

      formData.append("preco", produto.preco);

      formData.append("estoque", produto.estoque);

      formData.append("categoria", produto.categoria?._id || produto.categoria);

      if (produto.imagemArquivo) {
        formData.append("imagem", produto.imagemArquivo);
      }
      for (let dado of formData.entries()) {
        console.log(dado[0], dado[1]);
      }
      await api.put(`/produtos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);

      toast.error("Erro ao atualizar produto");
    } finally {
      setSalvando(false);
    }
  }
  return (
    <div className="p-6 pt-28">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>

      <div className="space-y-4 max-w-xl">
        <div>
          <label>Nome</label>

          <input
            className="border rounded w-full p-2"
            value={produto.nome}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
          />
        </div>

        <div>
          <label>Descrição</label>

          <textarea
            className="border rounded w-full p-2"
            value={produto.descricao}
            onChange={(e) => atualizarCampo("descricao", e.target.value)}
          />
        </div>
        <div>
          <label>Categoria</label>

          <select
            className="border rounded w-full bg-[#010208] p-2"
            value={produto.categoria?._id || produto.categoria}
            onChange={(e) => atualizarCampo("categoria", e.target.value)}
          >
            <option value="">Selecione uma categoria</option>

            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Preço</label>

          <input
            type="number"
            className="border rounded w-full p-2"
            value={produto.preco}
            onChange={(e) => atualizarCampo("preco", e.target.value)}
          />
        </div>

        <div>
          <label>Estoque</label>

          <input
            type="number"
            className="border rounded w-full p-2"
            value={produto.estoque}
            onChange={(e) => atualizarCampo("estoque", e.target.value)}
          />
        </div>
        <div>
          <label>Imagem do produto</label>

          <input
            type="file"
            className="border rounded w-full p-2"
            onChange={(e) => {
              if (e.target.files) {
                atualizarCampo("imagemArquivo", e.target.files[0]);
              }
            }}
          />
        </div>
        {produto.imagem && (
          <img
            src={`http://localhost:3000${produto.imagem}`}
            className="w-32 mt-3 rounded"
          />
        )}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={salvarProduto}
        disabled={salvando}
      >
        {salvando ? "Salvando..." : "Salvar Alterações"}
      </button>
    </div>
  );
}
