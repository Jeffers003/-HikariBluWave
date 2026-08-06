import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/admin/StatusBadge";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";

interface Categoria {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
  ordem: number;
  ativo: boolean;
}

interface CategoryTableProps {
  categorias: Categoria[];

  onEdit: (categoria: Categoria) => void;

  onDelete: (id: string) => void;
}

export default function CategoryTable({
  categorias,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#263244]">
      <table className="w-full">
        <thead>
          <tr className="bg-[#046AEE] text-black">
            <th className="p-3 text-left">Imagem</th>

            <th className="p-3 text-left">Nome</th>

            <th className="p-3">Ordem</th>

            <th className="p-3">Status</th>

            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr
              key={categoria._id}
              className="
                border-t
                border-[#263244]
                hover:bg-[#111827]
                transition
              "
            >
              <td className="p-3">
                {categoria.imagem ? (
                  <img
                    src={categoria.imagem}
                    alt={categoria.nome}
                    className="
                      h-12
                      w-12
                      rounded-lg
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#1A2332]
                      text-xs
                      text-slate-400
                    "
                  >
                    N/A
                  </div>
                )}
              </td>

              <td className="p-3">
                <div>
                  <p className="font-medium text-white">{categoria.nome}</p>

                  <p className="text-sm text-slate-400">
                    {categoria.descricao}
                  </p>
                </div>
              </td>

              <td className="p-3 text-center text-white">{categoria.ordem}</td>

              <td className="p-3 text-center">
                <StatusBadge ativo={categoria.ativo} />
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(categoria)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <ConfirmDeleteDialog
                    title="Excluir Categoria"
                    description={`Deseja excluir "${categoria.nome}"?`}
                    onConfirm={() => onDelete(categoria._id)}
                  >
                    <Button size="icon" variant="destructive">
                      <Trash2 size={16} />
                    </Button>
                  </ConfirmDeleteDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
