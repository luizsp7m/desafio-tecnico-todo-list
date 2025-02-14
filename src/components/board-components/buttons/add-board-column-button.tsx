import { Button } from "@/components/ui/button";
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";

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
