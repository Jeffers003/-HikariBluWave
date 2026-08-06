import { useCart } from "../contexts/CartContext";
import api from "../services/api";

export default function Carrinho() {
  const {
    carrinho,
    removerCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    limparCarrinho,
  } = useCart();

  const total = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  async function finalizarCompra() {
    try {
      const pedido = {
        itens: carrinho.map((item) => ({
          produto: item._id,

          quantidade: item.quantidade,
        })),

        formaPagamento: "pix",
      };

      const response = await api.post("/pedidos", pedido);

      console.log("Pedido criado:", response.data);

      limparCarrinho();

      alert("Pedido realizado com sucesso!");
    } catch (error) {
      console.error(error);

      alert("Erro ao criar pedido");
    }
  }

  return (
    <div
      className="
bg-[#010308]
min-h-screen
p-10
"
    >
      <h1
        className="
text-white
text-3xl
mb-8
"
      >
        Carrinho
      </h1>

      {carrinho.length === 0 ? (
        <p className="text-gray-400">Carrinho vazio</p>
      ) : (
        <>
          {carrinho.map((item) => (
            <div
              key={item._id}
              className="
bg-gray-900
p-5
rounded-xl
mb-4
flex
justify-between
items-center
"
            >
              <div>
                <h2 className="text-white">{item.nome}</h2>

                <p className="text-gray-400">R$ {item.preco.toFixed(2)}</p>

                <div>
                  <button onClick={() => diminuirQuantidade(item._id)}>
                    -
                  </button>

                  <span
                    className="
text-white
mx-4
"
                  >
                    {item.quantidade}
                  </span>

                  <button onClick={() => aumentarQuantidade(item._id)}>
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removerCarrinho(item._id)}
                className="
bg-red-600
text-white
px-3
py-2
rounded
"
              >
                Remover
              </button>
            </div>
          ))}

          <h2
            className="
text-white
text-2xl
mt-8
"
          >
            Total: R$ {total.toFixed(2)}
          </h2>

          <button
            onClick={finalizarCompra}
            className="
mt-6
bg-blue-600
text-white
px-8
py-3
rounded-lg
"
          >
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}
