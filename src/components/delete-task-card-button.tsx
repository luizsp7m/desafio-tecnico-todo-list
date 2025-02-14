import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useBoardStore } from "@/store/board-store";
import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";

interface DeleteTaskCardButtonProps {
  taskCardId: string;
  boardColumnId: string;
}

export function DeleteTaskCardButton({
  taskCardId,
  boardColumnId,
}: DeleteTaskCardButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const { deleteTaskCard } = useBoardStore();
  const { handleCloseTaskCardFormModal } = useTaskCardFormModalStore();

  function handleClickDeleteButton() {
    if (confirming) {
      deleteTaskCard({ taskCardId, boardColumnId });
      handleCloseTaskCardFormModal();
    } else {
      setConfirming(true);
    }
  }

  return (
    <Button
      type="button"
      variant={confirming ? "destructive" : "outline"}
      onClick={handleClickDeleteButton}
      className="w-full sm:w-auto"
    >
      <Trash />
      {confirming ? "Confirmar" : "Excluir"}
    </Button>
  );
}
