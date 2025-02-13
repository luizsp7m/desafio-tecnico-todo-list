export type TaskCard = {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  tags: string[];
  comments: TaskCardComment[];
  createdAt: string;
};

type TaskCardComment = {
  id: string;
  comment: string;
  createdAt: string;
};
