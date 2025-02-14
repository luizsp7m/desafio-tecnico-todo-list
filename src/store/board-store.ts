import { boardColumnsData } from "@/assets/board-columns-data";
import { BoardColumnFormData } from "@/components/board-column-form";
import { TaskCardFormData } from "@/components/task-card-form";
import { BoardColumn } from "@/types/board-column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UpsertBoardColumnProps {
  boardColumnId?: string;
  data: BoardColumnFormData;
}

interface UpsertTaskCardProps {
  taskCardId?: string;
  boardColumnId: string;
  data: TaskCardFormData;
}

interface DeleteTaskCardProps {
  boardColumnId: string;
  taskCardId: string;
}

type BoardStore = {
  boardColumns: BoardColumn[];
  setBoardColumns: (boardColumns: BoardColumn[]) => void;
  upsertBoardColumn: (props: UpsertBoardColumnProps) => void;
  deleteBoardColumn: (boardColumnId: string) => void;
  upsertTaskCard: (props: UpsertTaskCardProps) => void;
  deleteTaskCard: (props: DeleteTaskCardProps) => void;
};

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boardColumns: boardColumnsData,

      setBoardColumns: (boardColumns) => set(() => ({ boardColumns })),

      upsertBoardColumn: ({ boardColumnId, data }) =>
        set((state) =>
          boardColumnId
            ? {
                boardColumns: state.boardColumns.map((boardColumn) =>
                  boardColumn.id === boardColumnId
                    ? { ...boardColumn, title: data.title }
                    : boardColumn,
                ),
              }
            : {
                boardColumns: [
                  ...state.boardColumns,
                  {
                    id: createUniqueId(),
                    title: data.title,
                    taskCards: [],
                    createdAt: createTimestamp(),
                  },
                ],
              },
        ),

      deleteBoardColumn: (boardColumnId) =>
        set((state) => ({
          boardColumns: state.boardColumns.filter(
            (boardColumn) => boardColumn.id !== boardColumnId,
          ),
        })),

      upsertTaskCard: ({ taskCardId, boardColumnId, data }) =>
        set((state) =>
          taskCardId
            ? {
                boardColumns: state.boardColumns.map((boardColumn) =>
                  boardColumn.id === boardColumnId
                    ? {
                        ...boardColumn,
                        taskCards: boardColumn.taskCards.map((taskCard) =>
                          taskCard.id === taskCardId
                            ? {
                                ...taskCard,
                                title: data.title,
                                description: data.description || null,
                                dueDate: data.dueDate
                                  ? data.dueDate.toISOString()
                                  : null,
                              }
                            : taskCard,
                        ),
                      }
                    : boardColumn,
                ),
              }
            : {
                boardColumns: state.boardColumns.map((boardColumn) =>
                  boardColumn.id === boardColumnId
                    ? {
                        ...boardColumn,
                        taskCards: [
                          ...boardColumn.taskCards,
                          {
                            id: createUniqueId(),
                            title: data.title,
                            description: null,
                            dueDate: null,
                            createdAt: createTimestamp(),
                          },
                        ],
                      }
                    : boardColumn,
                ),
              },
        ),

      deleteTaskCard: ({ taskCardId, boardColumnId }) =>
        set((state) => ({
          boardColumns: state.boardColumns.map((boardColumn) =>
            boardColumn.id === boardColumnId
              ? {
                  ...boardColumn,
                  taskCards: boardColumn.taskCards.filter(
                    (taskCard) => taskCard.id !== taskCardId,
                  ),
                }
              : boardColumn,
          ),
        })),
    }),
    {
      name: "todo-list:board-storage",
    },
  ),
);
