import { useParams } from "react-router-dom";

import { produtosMock } from "@/data/produtos";

import Price from "@/components/shared/Price";
import PrimaryButton from "@/components/shared/PrimaryButton";
import PriceNotice from "@/components/shared/PriceNotice";

export default function ProdutoDetalhePublico() {
  const { slug } = useParams();

  const produto = produtosMock.find((item) => item.slug === slug);

  if (!produto) {
    return (
      <h1 className="mt-10 text-center text-white">Produto não encontrado</h1>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#010308] px-6 py-16">
      <PriceNotice />
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <img
          src={produto.imagem}
          alt={produto.titulo}
          className="
            rounded-3xl
            bg-[#111827]
            p-10
          "
        />

        <div>
          <h1 className="text-4xl font-bold text-white">{produto.titulo}</h1>
          <div className="mt-4 flex gap-3 text-sm text-slate-400">
            <span>⭐ {produto.avaliacao}</span>

            {produto.vendas && <span>{produto.vendas} vendas</span>}
          </div>
          <div className="mt-6">
            <Price atual={produto.preco} antigo={produto.precoAntigo ?? 0} />
          </div>

          <PrimaryButton
            className="mt-8"
            onClick={() =>
              window.open(produto.linkAfiliado, "_blank", "noopener,noreferrer")
            }
          >
            Comprar produto
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
