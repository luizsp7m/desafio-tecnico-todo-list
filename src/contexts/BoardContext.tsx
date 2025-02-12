import { columnsData } from "@/assets/columns-data";
import { Column } from "@/types/column";
import { createContext, ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

interface CreateNewColumnProps {
  title: string;
}

interface CreateNewCardProps {
  title: string;
  columnId: string;
}

interface BoardContextProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  createNewColumn: (props: CreateNewColumnProps) => void;
  deleteColumn: (columnId: string) => void;
  createNewCard: (props: CreateNewCardProps) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardContextProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardContextProviderProps) {
  const [columns, setColumns] = useState(columnsData);

  function createNewColumn({ title }: CreateNewColumnProps) {
    setColumns((prevState) => [
      ...prevState,
      { id: uuid(), title, cards: [], createdAt: new Date().toISOString() },
    ]);
  }

  function createNewCard({ title, columnId }: CreateNewCardProps) {
    setColumns((prevState) =>
      prevState.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            cards: [
              ...column.cards,
              {
                id: uuid(),
                title,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }

        return column;
      }),
    );
  }

  function deleteColumn(columnId: string) {
    setColumns((prevState) =>
      prevState.filter((column) => column.id !== columnId),
    );
  }

  return (
    <BoardContext.Provider
      value={{
        columns,
        setColumns,
        createNewColumn,
        deleteColumn,
        createNewCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
