import { columnsData } from "@/assets/columns-data";
import { Column } from "@/types/column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";
import { createContext, ReactNode, useState } from "react";

interface UpsertColumnProps {
  columnId?: string;

  data: {
    title: string;
  };
}

interface UpsertCardProps {
  columnId: string;

  cardId?: string;

  data: {
    title: string;
  };
}

interface BoardContextProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  upsertColumn: (props: UpsertColumnProps) => void;
  deleteColumn: (columnId: string) => void;
  upsertCard: (props: UpsertCardProps) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardContextProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardContextProviderProps) {
  const [columns, setColumns] = useState(columnsData);

  function upsertColumn({ columnId, data }: UpsertColumnProps) {
    if (columnId) {
      setColumns((prevState) =>
        prevState.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              ...data,
            };
          }

          return column;
        }),
      );

      return;
    }

    setColumns((prevState) => [
      ...prevState,
      {
        ...data,
        id: createUniqueId(),
        cards: [],
        createdAt: createTimestamp(),
      },
    ]);
  }

  function upsertCard({ columnId, cardId, data }: UpsertCardProps) {
    const { title } = data;

    if (cardId) {
      setColumns((prevState) =>
        prevState.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              cards: column.cards.map((card) => {
                if (card.id === cardId) {
                  return {
                    ...card,
                    ...data,
                  };
                }

                return card;
              }),
            };
          }

          return column;
        }),
      );

      return;
    }

    setColumns((prevState) =>
      prevState.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            cards: [
              ...column.cards,
              {
                id: createUniqueId(),
                title,
                createdAt: createTimestamp(),
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
        upsertColumn,
        deleteColumn,
        upsertCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
