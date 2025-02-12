import { Todo } from "./todo";

export type Category = {
  id: string;
  title: string;
  order: number;
  todos: Todo[];
};
