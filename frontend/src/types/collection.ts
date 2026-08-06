export interface Collection {
  _id: string;
  nome: string;
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  imagem: string | null;

  filtros: {
    categorias?: string[];
    tags?: string[];
    marketplaces?: string[];
  };

  destaque?: boolean;
}
