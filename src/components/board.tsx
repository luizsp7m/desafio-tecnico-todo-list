import { Button } from "./ui/button";
import { FormModal } from "./form-modal";
import { BoardColumnForm } from "./board-column-form";
import { useBoard } from "@/hooks/use-board";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { BoardColumnDraggable } from "./board-column-draggable";
import { useFormModal } from "@/hooks/use-form-modal";
import { BoardColumn } from "@/types/board-column";

export function Board() {
  const { formModalIsOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal<BoardColumn>();

  const { boardColumns, setBoardColumns } = useBoard();

  function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "boardColumn") {
      const updatedBoardColumns = [...boardColumns];
      const [movedBoardColumn] = updatedBoardColumns.splice(source.index, 1);
      updatedBoardColumns.splice(destination.index, 0, movedBoardColumn);
      setBoardColumns(updatedBoardColumns);
    } else {
      const sourceColumn = boardColumns.find(
        (col) => col.id === source.droppableId,
      );
      const destinationColumn = boardColumns.find(
        (col) => col.id === destination.droppableId,
      );

      if (!sourceColumn || !destinationColumn) return;

      // Movendo dentro da mesma coluna
      if (sourceColumn === destinationColumn) {
        const updatedTaskCards = [...sourceColumn.taskCards];
        const [movedTaskCard] = updatedTaskCards.splice(source.index, 1);
        updatedTaskCards.splice(destination.index, 0, movedTaskCard);

        setBoardColumns((prev) =>
          prev.map((col) =>
            col.id === source.droppableId
              ? { ...col, taskCards: updatedTaskCards }
              : col,
          ),
        );
      } else {
        // Movendo entre colunas
        const sourceTaskCards = [...sourceColumn.taskCards];
        const destinationTaskCards = [...destinationColumn.taskCards];
        const [movedTaskCard] = sourceTaskCards.splice(source.index, 1);
        destinationTaskCards.splice(destination.index, 0, movedTaskCard);

        setBoardColumns((prev) =>
          prev.map((col) =>
            col.id === source.droppableId
              ? { ...col, taskCards: sourceTaskCards }
              : col.id === destination.droppableId
                ? { ...col, taskCards: destinationTaskCards }
                : col,
          ),
        );
      }
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => handleOpenFormModal()}>Adicionar coluna</Button>

      <FormModal
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <BoardColumnForm handleCloseModal={handleCloseFormModal} />
      </FormModal>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="boardColumn"
          direction="horizontal"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex items-start overflow-x-auto"
            >
              {boardColumns.map((boardColumn, boardColumnIndex) => (
                <BoardColumnDraggable
                  key={boardColumn.id}
                  boardColumn={boardColumn}
                  boardColumnIndex={boardColumnIndex}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
