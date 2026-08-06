export interface Achadinho {
  _id: string;

  titulo: string;

  descricao?: string;

  imagem: string | null;

  marketplace: string;

  preco: number;

  precoAntigo?: number;

  linkAfiliado: string;

  destaque: boolean;

  ativo: boolean;

  categoria?: string;

  tags?: string[];

  colecoes?: string[];
}
