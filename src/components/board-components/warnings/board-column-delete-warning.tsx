import { useBoardStore } from "@/store/board-store";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useBoardColumnDeleteWarningStore } from "@/store/board-column-delete-warning-store";

export function BoardColumnDeleteWarning() {
  const { deleteBoardColumn } = useBoardStore();

  const {
    boardColumnDeleteWarningIsOpen,
    selectedBoardColumn,
    handleCloseBoardColumnDeleteWarning,
  } = useBoardColumnDeleteWarningStore();

  function handleDeleteBoardColumn() {
    if (!selectedBoardColumn) return;

    deleteBoardColumn(selectedBoardColumn.id);
    handleCloseBoardColumnDeleteWarning();
  }

  return (
    <AlertDialog
      open={boardColumnDeleteWarningIsOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseBoardColumnDeleteWarning();
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
