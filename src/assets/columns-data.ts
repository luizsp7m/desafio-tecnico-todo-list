import { Column } from "@/types/column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";

export const columnsData: Column[] = [
  {
    id: createUniqueId(),
    title: "Coluna 1",
    cards: [
      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 1",
      },

      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 2",
      },
    ],

    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 2",
    cards: [],
    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 3",
    cards: [],
    createdAt: createTimestamp(),
  },
];
