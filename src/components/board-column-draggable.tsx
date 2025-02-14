import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TaskCardDraggable } from "./task-card-draggable";
import { BoardColumnHeaderDropdown } from "./board-column-header-dropdown";
import { useDeleteAlert } from "@/hooks/use-delete-alert";
import { DeleteBoardColumnAlert } from "./delete-board-column-alert";
import { BoardColumn } from "@/types/board-column";
import { AddTaskCardButton } from "./add-task-card-button";
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { useBoardStore } from "@/store/board-store";

interface BoardColumnDraggableProps {
  boardColumn: BoardColumn;
  boardColumnIndex: number;
}

export function BoardColumnDraggable({
  boardColumn,
  boardColumnIndex,
}: BoardColumnDraggableProps) {
  const { handleOpenBoardColumnFormModal } = useBoardColumnFormModalStore();
  const { deleteBoardColumn } = useBoardStore();

  const { deleteAlertIsOpen, handleOpenDeleteAlert, handleCloseDeleteAlert } =
    useDeleteAlert();

  function handleDeleteBoardColumn() {
    deleteBoardColumn(boardColumn.id);
    handleCloseDeleteAlert();
  }

  return (
    <>
      <Draggable draggableId={boardColumn.id} index={boardColumnIndex}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mr-3 w-80 min-w-80 max-w-80 rounded bg-secondary shadow-sm"
          >
            <div
              {...provided.dragHandleProps}
              className="flex cursor-grab items-center justify-between gap-2 truncate border-b p-3 text-sm dark:border-b-primary/10"
            >
              <span className="truncate">{boardColumn.title}</span>

              <BoardColumnHeaderDropdown
                handleOpenBoardColumnFormModal={() =>
                  handleOpenBoardColumnFormModal({
                    selectedBoardColumn: boardColumn,
                  })
                }
                handleOpenDeleteAlert={handleOpenDeleteAlert}
              />
            </div>

            <Droppable droppableId={boardColumn.id} type="taskCard">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="-mb-2 min-h-[128px] p-3"
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

      <DeleteBoardColumnAlert
        isOpen={deleteAlertIsOpen}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        handleDeleteBoardColumn={handleDeleteBoardColumn}
      />
    </>
  );
}
