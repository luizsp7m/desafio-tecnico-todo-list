import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";
import { Plus } from "lucide-react";

interface AddTaskCardButtonProps {
  boardColumnId: string;
}

export function AddTaskCardButton({ boardColumnId }: AddTaskCardButtonProps) {
  const { handleOpenTaskCardFormModal } = useTaskCardFormModalStore();

  return (
    <button
      onClick={() =>
        handleOpenTaskCardFormModal({ boardColumnId, selectedTaskCard: null })
      }
      className="flex w-full items-center justify-center gap-2 border-t bg-secondary p-3 text-sm dark:border-t-primary/10"
    >
      <Plus size={16} />
      Adicionar tarefa
    </button>
  );
}
