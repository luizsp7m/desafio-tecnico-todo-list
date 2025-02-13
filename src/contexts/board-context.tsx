import { boardColumnsData } from "@/assets/board-columns-data";
import { BoardColumn } from "@/types/board-column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";
import { createContext, ReactNode, useState } from "react";

interface UpsertBoardColumnProps {
  boardColumnId?: string;

  data: {
    title: string;
  };
}

interface UpsertTaskCardProps {
  boardColumnId: string;
  taskCardId?: string;

  data: {
    title: string;
  };
}

interface BoardContextProps {
  boardColumns: BoardColumn[];
  setBoardColumns: React.Dispatch<React.SetStateAction<BoardColumn[]>>;
  upsertBoardColumn: (props: UpsertBoardColumnProps) => void;
  deleteBoardColumn: (columnId: string) => void;
  upsertTaskCard: (props: UpsertTaskCardProps) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardContextProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardContextProviderProps) {
  const [boardColumns, setBoardColumns] = useState(boardColumnsData);

  function upsertBoardColumn({ boardColumnId, data }: UpsertBoardColumnProps) {
    if (boardColumnId) {
      setBoardColumns((prevState) =>
        prevState.map((boardColumn) => {
          if (boardColumn.id === boardColumnId) {
            return {
              ...boardColumn,
              ...data,
            };
          }

          return boardColumn;
        }),
      );

      return;
    }

    setBoardColumns((prevState) => [
      ...prevState,
      {
        ...data,
        id: createUniqueId(),
        taskCards: [],
        createdAt: createTimestamp(),
      },
    ]);
  }

  function upsertTaskCard({
    boardColumnId,
    taskCardId,
    data,
  }: UpsertTaskCardProps) {
    const { title } = data;

    if (taskCardId) {
      setBoardColumns((prevState) =>
        prevState.map((boardColumn) => {
          if (boardColumn.id === boardColumnId) {
            return {
              ...boardColumn,
              taskCards: boardColumn.taskCards.map((taskCard) => {
                if (taskCard.id === taskCardId) {
                  return {
                    ...taskCard,
                    ...data,
                  };
                }

                return taskCard;
              }),
            };
          }

          return boardColumn;
        }),
      );

      return;
    }

    setBoardColumns((prevState) =>
      prevState.map((boardColumn) => {
        if (boardColumn.id === boardColumnId) {
          return {
            ...boardColumn,
            taskCards: [
              ...boardColumn.taskCards,
              {
                id: createUniqueId(),
                title,
                description: null,
                dueDate: null,
                createdAt: createTimestamp(),
              },
            ],
          };
        }

        return boardColumn;
      }),
    );
  }

  function deleteBoardColumn(boardColumnId: string) {
    setBoardColumns((prevState) =>
      prevState.filter((boardColumn) => boardColumn.id !== boardColumnId),
    );
  }

  return (
    <BoardContext.Provider
      value={{
        boardColumns,
        setBoardColumns,
        upsertBoardColumn,
        deleteBoardColumn,
        upsertTaskCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
