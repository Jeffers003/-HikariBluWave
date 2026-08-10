import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../contexts/CartContext";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem: string;
  categoria?: {
    nome: string;
  };
}

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const { adicionarCarrinho } = useCart();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const response = await api.get(`/produtos/${id}`);

        console.log("Produto:", response.data);

        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    }

    buscarProduto();
  }, [id]);

  if (loading) {
    return <h1 className="text-white text-center mt-10">Carregando...</h1>;
  }

  if (!produto) {
    return (
      <h1 className="text-white text-center mt-10">Produto não encontrado</h1>
    );
  }

  return (
    <div className="pt-10   bg-[#010308] min-h-screen">
      <div
        className="
        max-w-6xl
        
        mx-auto
        px-6
        py-16
        grid
        md:grid-cols-2
        gap-10
      "
      >
        <img
          src={`http://localhost:3000${produto.imagem}`}
          alt={produto.nome}
          className="
            w-full
            rounded-xl
          "
        />

        <div>
          <h1
            className="
            text-white
            text-4xl
            font-bold
          "
          >
            {produto.nome}
          </h1>

          <p
            className="
            text-gray-400
            mt-4
          "
          >
            {produto.descricao}
          </p>

          <p
            className="
            text-blue-400
            text-3xl
            font-bold
            mt-6
          "
          >
            R$ {produto.preco.toFixed(2)}
          </p>

          <p
            className="
            text-gray-300
            mt-4
          "
          >
            Estoque: {produto.estoque}
          </p>

          <button
            onClick={() =>
              adicionarCarrinho({
                _id: produto._id,
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: 1,
              })
            }
            className="
    mt-8
    bg-blue-600
    text-white
    px-6
    py-3
    rounded-lg
  "
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
