export interface Collection {
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
