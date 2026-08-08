// src/services/produto.service.ts
import api from "@/services/api";
import type { Produto } from "@/types/produto";

// Formato bruto que vem do backend (Produto.js) — note que usa "nome",
// não "titulo", e não tem todos os campos que o front espera.
interface ProdutoBackend {
  _id: string;
  nome: string;
  slug?: string;
  descricao: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  ativo: boolean;
  marketplace?: string;
  destaque?: boolean;
  avaliacao?: number;
  vendas?: number;
  linkAfiliado?: string;
  categoria?: { _id: string; nome: string } | null;
}

function adaptarProduto(raw: ProdutoBackend): Produto {
  return {
    _id: raw._id,
    titulo: raw.nome,
    slug: raw.slug || raw._id, // fallback: se por algum motivo não tiver slug, usa o _id
    imagem: raw.imagem,
    preco: raw.preco,
    precoAntigo: raw.precoAntigo,
    marketplace: raw.marketplace || "proprio",
    destaque: raw.destaque || false,
    avaliacao: raw.avaliacao,
    vendas: raw.vendas,
    linkAfiliado: raw.linkAfiliado,
    categoria: raw.categoria || null,
  };
}

interface ListarProdutosParams {
  categoria?: string;
  nome?: string;
  page?: number;
  limit?: number;
}

interface ListarProdutosResposta {
  produtos: Produto[];
  totalProdutos: number;
  totalPages: number;
  page: number;
}

export async function listarProdutosPublicos(
  params: ListarProdutosParams = {},
): Promise<ListarProdutosResposta> {
  const { data } = await api.get("/produtos", { params });

  return {
    produtos: (data.produtos as ProdutoBackend[]).map(adaptarProduto),
    totalProdutos: data.totalProdutos,
    totalPages: data.totalPages,
    page: data.page,
  };
}
