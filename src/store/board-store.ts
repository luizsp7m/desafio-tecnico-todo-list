import { boardColumnsData } from "@/assets/board-columns-data";
import { BoardColumnFormData } from "@/components/board-column-form";
import { BoardColumn } from "@/types/board-column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";
import { create } from "zustand";

interface UpsertBoardColumnProps {
  boardColumnId?: string;
  data: BoardColumnFormData;
}

type BoardStore = {
  boardColumns: BoardColumn[];
  setBoardColumns: (boardColumns: BoardColumn[]) => void;
  upsertBoardColumn: (props: UpsertBoardColumnProps) => void;
  deleteBoardColumn: (boardColumnId: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  boardColumns: boardColumnsData,

  setBoardColumns: (boardColumns) =>
    set(() => ({
      boardColumns,
    })),

  upsertBoardColumn: ({ boardColumnId, data }) =>
    set((state) =>
      boardColumnId
        ? {
            boardColumns: state.boardColumns.map((boardColumn) => {
              if (boardColumn.id === boardColumnId) {
                return {
                  ...boardColumn,
                  title: data.title,
                };
              }

              return boardColumn;
            }),
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
}));
