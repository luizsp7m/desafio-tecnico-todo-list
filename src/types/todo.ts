export type Todo = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  comments?: { id: string; comment: string; createdAt: string }[];
  createdAt: string;
};
