import { TaskCard } from "./task-card";

export type BoardColumn = {
  id: string;
  title: string;
  taskCards: TaskCard[];
  createdAt: string;
};
