export interface Produto {
  _id: string;

  titulo: string;

  slug: string;

  imagem: string;

  marketplace: string;

  preco: number;

  precoAntigo?: number;

  avaliacao?: number;

  vendas?: number;

  linkAfiliado: string;

  destaque?: boolean;
}
