export interface Review {
  id: number;
  nome: string;
  avatar: string;
  nota: number;
  marketplace: "AliExpress" | "Shopee" | "Mercado Livre";
  comentario: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    nome: "Carlos Henrique",
    avatar: "https://i.pravatar.cc/150?img=12",
    nota: 5,
    marketplace: "AliExpress",
    comentario:
      "Produto excelente, chegou antes do prazo e a qualidade é surpreendente.",
  },
  {
    id: 2,
    nome: "Mariana Souza",
    avatar: "https://i.pravatar.cc/150?img=32",
    nota: 5,
    marketplace: "Shopee",
    comentario: "Muito bem embalado. Comprarei novamente sem dúvidas.",
  },
  {
    id: 3,
    nome: "Lucas Almeida",
    avatar: "https://i.pravatar.cc/150?img=15",
    nota: 4,
    marketplace: "Mercado Livre",
    comentario: "Ótimo custo-benefício. Recomendo bastante.",
  },
];
