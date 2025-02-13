import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { TaskCardDraggable } from "./task-card-draggable";
import { FormModal } from "./form-modal";
import { useFormModal } from "@/hooks/use-form-modal";
import { BoardColumnHeaderDropdown } from "./board-column-header-dropdown";
import { TaskCard } from "@/types/task-card";
import { TaskCardForm } from "./task-card-form";
import { useDeleteAlert } from "@/hooks/use-delete-alert";
import { DeleteBoardColumnAlert } from "./delete-board-column-alert";
import { useBoard } from "@/hooks/use-board";
import { BoardColumn } from "@/types/board-column";
import { BoardColumnForm } from "./board-column-form";

interface BoardColumnDraggableProps {
  boardColumn: BoardColumn;
  boardColumnIndex: number;
}

export function BoardColumnDraggable({
  boardColumn,
  boardColumnIndex,
}: BoardColumnDraggableProps) {
  const {
    formModalIsOpen: boardColumnFormModalIsOpen,
    selectedItem: selectedBoardColumn,
    handleOpenFormModal: handleOpenBoardColumnFormModal,
    handleCloseFormModal: handleCloseBoardColumnFormModal,
  } = useFormModal<BoardColumn>();

  const {
    formModalIsOpen: taskCardFormModalIsOpen,
    selectedItem: selectedTaskCard,
    handleOpenFormModal: handleOpenTaskCardFormModal,
    handleCloseFormModal: handleCloseTaskCardModalModal,
  } = useFormModal<TaskCard>();

  const { deleteAlertIsOpen, handleOpenDeleteAlert, handleCloseDeleteAlert } =
    useDeleteAlert();

  const { deleteBoardColumn } = useBoard();

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
                  handleOpenBoardColumnFormModal(boardColumn)
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
                      handleOpenFormModal={() =>
                        handleOpenTaskCardFormModal(taskCard)
                      }
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <button
              onClick={() => handleOpenTaskCardFormModal()}
              className="flex w-full items-center justify-center gap-2 border-t p-3 text-sm dark:border-t-primary/10"
            >
              <Plus size={16} />
              Adicionar tarefa
            </button>
          </div>
        )}
      </Draggable>

      <FormModal
        isOpen={boardColumnFormModalIsOpen}
        handleCloseModal={handleCloseBoardColumnFormModal}
      >
        <BoardColumnForm
          handleCloseModal={handleCloseBoardColumnFormModal}
          selectedBoardColumn={selectedBoardColumn}
        />
      </FormModal>

      <FormModal
        isOpen={taskCardFormModalIsOpen}
        handleCloseModal={handleCloseTaskCardModalModal}
        lgModal={!!selectedTaskCard}
      >
        <TaskCardForm
          boardColumnId={boardColumn.id}
          handleCloseModal={handleCloseTaskCardModalModal}
          isFullMode={!!selectedTaskCard}
          selectedTaskCard={selectedTaskCard}
        />
      </FormModal>

      <DeleteBoardColumnAlert
        isOpen={deleteAlertIsOpen}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        handleDeleteBoardColumn={handleDeleteBoardColumn}
      />
    </>
  );
}
