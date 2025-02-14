import clsx from "clsx";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TaskCardDraggable } from "./task-card-draggable";
import { BoardColumnHeaderDropdown } from "../dropdowns/board-column-header-dropdown";
import { BoardColumn } from "@/types/board-column";
import { AddTaskCardButton } from "../buttons/add-task-card-button";

interface BoardColumnDraggableProps {
  boardColumn: BoardColumn;
  boardColumnIndex: number;
}

export function BoardColumnDraggable({
  boardColumn,
  boardColumnIndex,
}: BoardColumnDraggableProps) {
  return (
    <Draggable draggableId={boardColumn.id} index={boardColumnIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mr-3 w-80 min-w-80 max-w-80 overflow-hidden rounded bg-secondary shadow-sm"
        >
          <div
            {...provided.dragHandleProps}
            className="flex cursor-grab items-center justify-between gap-2 truncate border-b bg-secondary p-3 text-sm dark:border-b-primary/10"
          >
            <span className="truncate">{boardColumn.title}</span>
            <BoardColumnHeaderDropdown boardColumn={boardColumn} />
          </div>

          <Droppable droppableId={boardColumn.id} type="taskCard">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={clsx(
                  "-mb-2 min-h-[128px] bg-secondary p-3 transition-colors",
                  snapshot.isDraggingOver
                    ? "bg-zinc-200 dark:bg-zinc-600"
                    : "bg-transparent",
                )}
                {...provided.droppableProps}
              >
                {boardColumn.taskCards.map((taskCard, taskCardIndex) => (
                  <TaskCardDraggable
                    key={taskCard.id}
                    taskCard={taskCard}
                    taskCardIndex={taskCardIndex}
                    boardColumnId={boardColumn.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddTaskCardButton boardColumnId={boardColumn.id} />
        </div>
      )}
    </Draggable>
  );
}
