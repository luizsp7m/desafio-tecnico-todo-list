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

      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 3",
      },

      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 4",
      },
    ],

    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 2",
    cards: [
      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 5",
      },
    ],
    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 3",
    cards: [
      {
        id: createUniqueId(),
        createdAt: createTimestamp(),
        title: "Tarefa 6",
      },
    ],
    createdAt: createTimestamp(),
  },
];
