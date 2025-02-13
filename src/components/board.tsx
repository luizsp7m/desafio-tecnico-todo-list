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
      const updatedColumns = [...boardColumns];
      const [movedColumn] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, movedColumn);
      setBoardColumns(updatedColumns);
    } else {
      const sourceColumn = boardColumns.find(
        (col) => col.id === source.droppableId,
      );
      const destinationColumn = boardColumns.find(
        (col) => col.id === destination.droppableId,
      );

      if (!sourceColumn || !destinationColumn) return;

      if (sourceColumn === destinationColumn) {
        const updatedCards = [...sourceColumn.taskCards];
        const [movedCard] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);

        setBoardColumns((prev) =>
          prev.map((col) =>
            col.id === sourceColumn.id
              ? { ...col, taskCards: updatedCards }
              : col,
          ),
        );
      } else {
        const sourceCards = [...sourceColumn.taskCards];
        const destinationCards = [...destinationColumn.taskCards];
        const [movedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, movedCard);

        setBoardColumns((prev) =>
          prev.map((col) =>
            col.id === sourceColumn.id
              ? { ...col, taskCards: sourceCards }
              : col.id === destinationColumn.id
                ? { ...col, taskCards: destinationCards }
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
