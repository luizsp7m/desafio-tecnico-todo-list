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

interface DeleteBoardColumnAlertProps {
  isOpen: boolean;
  handleDeleteBoardColumn: () => void;
  handleCloseDeleteAlert: () => void;
}

export function DeleteBoardColumnAlert({
  isOpen,
  handleDeleteBoardColumn,
  handleCloseDeleteAlert,
}: DeleteBoardColumnAlertProps) {
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

          <Button onClick={handleDeleteBoardColumn}>Continuar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
