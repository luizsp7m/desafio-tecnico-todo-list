import { Category } from "@/types/category";
import { v4 as uuid } from "uuid";

export const categoriesData: Category[] = [
  {
    id: uuid(),
    title: "Categoria 1",
    todos: [
      {
        id: uuid(),
        createdAt: new Date().toISOString(),
        title: "Todo 1",
      },

      {
        id: uuid(),
        createdAt: new Date().toISOString(),
        title: "Todo 2",
      },
    ],
  },
  {
    id: uuid(),
    title: "Categoria 2",
    todos: [],
  },
  {
    id: uuid(),
    title: "Categoria 3",
    todos: [],
  },
];
