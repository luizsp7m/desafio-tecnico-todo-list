import clsx from "clsx";

import { Draggable } from "@hello-pangea/dnd";
import { BookText, Calendar } from "lucide-react";
import { dateFormatter } from "@/utils/date-formatter";
import { TaskCard } from "@/types/task-card";
import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";

interface CardProps {
  taskCard: TaskCard;
  taskCardIndex: number;
  boardColumnId: string;
}

export function TaskCardDraggable({
  taskCard,
  taskCardIndex,
  boardColumnId,
}: CardProps) {
  const { handleOpenTaskCardFormModal } = useTaskCardFormModalStore();

  return (
    <Draggable draggableId={taskCard.id} index={taskCardIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {
            if (!snapshot.isDragging)
              handleOpenTaskCardFormModal({
                boardColumnId,
                selectedTaskCard: taskCard,
              });
          }}
          className={clsx(
            "mb-2 space-y-2 truncate rounded bg-white p-3 text-sm text-muted-foreground shadow-sm dark:bg-zinc-700 dark:text-white",
            {
              "bg-white dark:bg-zinc-500": snapshot.isDragging,
            },
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">{taskCard.title}</span>

            {(taskCard.description || taskCard.dueDate) && (
              <div className="flex items-center gap-2">
                {taskCard.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="text-[0.75rem]">
                      {dateFormatter(taskCard.dueDate)}
                    </span>
                  </div>
                )}

                {taskCard.description && <BookText size={14} />}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
