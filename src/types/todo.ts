export type Todo = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  order: number;
  tags: string[];
  comments: { id: string; comment: string; createdAt: string }[];
  createdAt: string;
};
