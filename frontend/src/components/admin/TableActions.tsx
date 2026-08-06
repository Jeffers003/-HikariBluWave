import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;

  deleteTitle?: string;
  deleteDescription?: string;

  showEdit?: boolean;
  showDelete?: boolean;
}

export default function TableActions({
  onEdit,
  onDelete,
  deleteTitle = "Excluir",
  deleteDescription = "Tem certeza que deseja excluir este item?",
  showEdit = true,
  showDelete = true,
}: TableActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {showEdit && (
        <Button size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {showDelete && (
        <ConfirmDeleteDialog
          title={deleteTitle}
          description={deleteDescription}
          onConfirm={onDelete}
        >
          <Button size="icon" variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </ConfirmDeleteDialog>
      )}
    </div>
  );
}
