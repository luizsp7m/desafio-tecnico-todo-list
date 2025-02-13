import { TaskCard } from "@/types/task-card";
import { create } from "zustand";

interface TaskCardFormModalStoreProps {
  taskCardFormModalIsOpen: boolean;
  boardColumnId: string | null;
  selectedTaskCard: TaskCard | null;

  handleOpenTaskCardFormModal: ({
    boardColumnId,
    selectedTaskCard,
  }: {
    boardColumnId: string;
    selectedTaskCard: TaskCard | null;
  }) => void;

  handleCloseTaskCardFormModal: () => void;
}

export const useTaskCardFormModalStore = create<TaskCardFormModalStoreProps>(
  (set) => ({
    taskCardFormModalIsOpen: false,
    boardColumnId: null,
    selectedTaskCard: null,

    handleOpenTaskCardFormModal: ({ boardColumnId, selectedTaskCard }) =>
      set(() => ({
        selectedTaskCard,
        boardColumnId,
        taskCardFormModalIsOpen: true,
      })),

    handleCloseTaskCardFormModal: () =>
      set(() => ({
        taskCardFormModalIsOpen: false,
        selectedTaskCard: null,
        boardColumnId: null,
      })),
  }),
);
