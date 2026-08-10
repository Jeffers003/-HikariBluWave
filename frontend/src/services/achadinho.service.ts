// src/services/achadinho.service.ts
import api from "@/services/api";
import type { Produto } from "@/types/produto";

interface AchadinhoBackend {
  _id: string;
  titulo: string;
  imagem: string | null;
  preco: number;
  precoAntigo?: number | null;
  marketplace: string;
  linkAfiliado: string;
  destaque?: boolean;
  ativo: boolean;
  categoria?: { _id: string; nome: string } | null;
}

function adaptarAchadinho(raw: AchadinhoBackend): Produto {
  return {
    _id: raw._id,
    titulo: raw.titulo,
    // achadinho não tem página de detalhe própria no seu site — o clique
    // no card manda direto pro link de afiliado, então o slug aqui só
    // existe pra satisfazer o tipo (não deve ser usado pra navegação).
    slug: raw._id,
    imagem: raw.imagem || "",
    preco: raw.preco,
    precoAntigo: raw.precoAntigo ?? undefined,
    marketplace: raw.marketplace,
    destaque: raw.destaque || false,
    linkAfiliado: raw.linkAfiliado,
    categoria: raw.categoria || null,
  };
}

export async function listarAchadinhosPublicos(
  categoriaId?: string,
): Promise<Produto[]> {
  const { data } = await api.get("/achadinhos", {
    params: categoriaId ? { categoria: categoriaId } : {},
  });

  return (data as AchadinhoBackend[])
    .filter((a) => a.ativo)
    .map(adaptarAchadinho);
}
