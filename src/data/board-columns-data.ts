import { BoardColumn } from "@/types/board-column";
import { createTimestamp } from "@/utils/create-timestamp";
import { createUniqueId } from "@/utils/create-unique-id";

export const boardColumnsData: BoardColumn[] = [
  {
    id: createUniqueId(),
    title: "BACKLOG",
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
    title: "A FAZER",
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
    title: "EM ANDAMENTO",
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
  {
    id: createUniqueId(),
    title: "FASE DE TESTES",
    taskCards: [],
    createdAt: createTimestamp(),
  },
  {
    id: createUniqueId(),
    title: "CONCLUÍDO",
    taskCards: [],
    createdAt: createTimestamp(),
  },
];
