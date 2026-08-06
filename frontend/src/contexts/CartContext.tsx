import { createContext, useContext, useState } from "react";

interface ProdutoCarrinho {
  _id: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

interface CartContextType {
  carrinho: ProdutoCarrinho[];

  adicionarCarrinho: (produto: ProdutoCarrinho) => void;

  removerCarrinho: (id: string) => void;

  aumentarQuantidade: (id: string) => void;

  diminuirQuantidade: (id: string) => void;

  limparCarrinho: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  function adicionarCarrinho(produto: ProdutoCarrinho) {
    const existe = carrinho.find((item) => item._id === produto._id);

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item._id === produto._id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item,
        ),
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: 1,
        },
      ]);
    }
  }

  function removerCarrinho(id: string) {
    setCarrinho(carrinho.filter((item) => item._id !== id));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }
  function aumentarQuantidade(id: string) {
    setCarrinho(
      carrinho.map((item) =>
        item._id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item,
      ),
    );
  }

  function diminuirQuantidade(id: string) {
    setCarrinho(
      carrinho.map((item) =>
        item._id === id && item.quantidade > 1
          ? {
              ...item,
              quantidade: item.quantidade - 1,
            }
          : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        carrinho,

        adicionarCarrinho,

        removerCarrinho,

        aumentarQuantidade,

        diminuirQuantidade,

        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart precisa estar dentro do CartProvider");
  }

  return context;
}
