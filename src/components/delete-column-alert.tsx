import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";

interface DeleteColumnAlertProps {
  isOpen: boolean;
  handleDeleteColumn: () => void;
  handleCloseDeleteAlert: () => void;
}

export function DeleteColumnAlert({
  isOpen,
  handleDeleteColumn,
  handleCloseDeleteAlert,
}: DeleteColumnAlertProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseDeleteAlert();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>

          <AlertDialogDescription>
            Essa coluna e suas tarefas serão apagadas permanentemente e não
            poderão ser restauradas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button onClick={handleDeleteColumn}>Continuar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
