import { Column } from "@/types/column";
import { v4 as uuid } from "uuid";

export const columnsData: Column[] = [
  {
    id: uuid(),
    title: "Coluna 1",
    cards: [
      {
        id: uuid(),
        createdAt: new Date().toISOString(),
        title: "Tarefa 1",
      },

      {
        id: uuid(),
        createdAt: new Date().toISOString(),
        title: "Tarefa 2",
      },
    ],

    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: "Coluna 2",
    cards: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: "Coluna 3",
    cards: [],
    createdAt: new Date().toISOString(),
  },
];
