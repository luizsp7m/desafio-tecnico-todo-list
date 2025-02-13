import { BoardColumn } from "@/types/board-column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";

export const boardColumnsData: BoardColumn[] = [
  {
    id: createUniqueId(),
    title: "Coluna 1",
    taskCards: [
      {
        id: createUniqueId(),
        title: "Tarefa 1",
        description: null,
        dueDate: createTimestamp(),
        createdAt: createTimestamp(),
      },

      {
        id: createUniqueId(),
        title: "Tarefa 2",
        description: null,
        dueDate: null,
        createdAt: createTimestamp(),
      },

      {
        id: createUniqueId(),
        title: "Tarefa 3",
        description: null,
        dueDate: null,
        createdAt: createTimestamp(),
      },

      {
        id: createUniqueId(),
        title: "Tarefa 4",
        description: null,
        dueDate: createTimestamp(),
        createdAt: createTimestamp(),
      },
    ],

    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 2",
    taskCards: [
      {
        id: createUniqueId(),
        title: "Tarefa 5",
        description: null,
        dueDate: null,
        createdAt: createTimestamp(),
      },
    ],
    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "Coluna 3",
    taskCards: [
      {
        id: createUniqueId(),
        title: "Tarefa 6",
        description: null,
        dueDate: createTimestamp(),
        createdAt: createTimestamp(),
      },
    ],
    createdAt: createTimestamp(),
  },
];
