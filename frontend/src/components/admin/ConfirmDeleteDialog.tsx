import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDeleteDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({
  children,
  title = "Confirmar exclusão",
  description = "Essa ação não poderá ser desfeita.",
  confirmText = "Excluir",
  cancelText = "Cancelar",
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

      <AlertDialogContent className="border-[#263244] bg-[#1A2332] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-400">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-300">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#263244] bg-transparent text-white hover:bg-slate-700">
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
