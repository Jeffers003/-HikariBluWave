// src/types/produto.ts
export interface Produto {
  _id: string;
  titulo: string;
  slug: string;
  imagem: string;
  preco: number;
  precoAntigo?: number;
  marketplace: string;
  destaque?: boolean;
  avaliacao?: number;
  vendas?: number;
  linkAfiliado?: string;
  categoria?: {
    _id: string;
    nome: string;
  } | null;
}
