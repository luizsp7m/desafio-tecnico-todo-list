import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { Button } from "./ui/button";

export function AddBoardColumnButton() {
  const { handleOpenBoardColumnFormModal } = useBoardColumnFormModalStore();

  return (
    <Button
      onClick={() =>
        handleOpenBoardColumnFormModal({ selectedBoardColumn: null })
      }
    >
      Adicionar coluna
    </Button>
  );
}
