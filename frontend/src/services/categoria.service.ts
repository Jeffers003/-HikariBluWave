import api from "@/services/api";
import type { Categoria } from "@/types/categoria";

export async function listarCategoriasPublicas(): Promise<Categoria[]> {
  const { data } = await api.get("/categorias/publicas");
  return data;
}

export async function listarCategorias(): Promise<Categoria[]> {
  const { data } = await api.get("/categorias");
  return data;
}
