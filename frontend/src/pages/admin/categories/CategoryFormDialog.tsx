import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import CategoryForm from "./CategoryForm";

interface CategoryFormData {
  nome: string;
  descricao: string;
  imagem: string;
  ordem: number;
  ativo: boolean;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;

  formData: CategoryFormData;

  onChange: (
    field: keyof CategoryFormData,
    value: string | number | boolean,
  ) => void;

  onSubmit: () => void;
}

export default function CategoryFormDialog({
  open,
  onOpenChange,
  title,
  formData,
  onChange,
  onSubmit,
}: CategoryFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-xl
          bg-[#0B1220]
          border-[#263244]
          text-white
        "
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <CategoryForm formData={formData} onChange={onChange} />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button
            className="
              bg-[#046AEE]
              hover:bg-[#0357C4]
            "
            onClick={onSubmit}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
