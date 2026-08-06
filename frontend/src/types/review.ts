export interface Review {
  _id: string;

  nome: string;

  cargo?: string;

  comentario: string;

  nota: number;

  avatar: string | null;

  ativo: boolean;

  destaque: boolean;

  ordem: number;

  createdAt: string;

  updatedAt: string;
}
