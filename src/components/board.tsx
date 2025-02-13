import { Button } from "./ui/button";
import { FormModal } from "./form-modal";
import { ColumnForm } from "./column-form";
import { useBoard } from "@/hooks/use-board";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ColumnDraggable } from "./column-draggable";
import { useFormModal } from "@/hooks/use-form-modal";
import { Column } from "@/types/column";

export function Board() {
  const { formModalIsOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal<Column>();

  const { columns, setColumns } = useBoard();

  function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "column") {
      const updatedColumns = [...columns];
      const [movedColumn] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, movedColumn);
      setColumns(updatedColumns);
    } else {
      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destinationColumn = columns.find(
        (col) => col.id === destination.droppableId,
      );

      if (!sourceColumn || !destinationColumn) return;

      if (sourceColumn === destinationColumn) {
        const updatedCards = [...sourceColumn.cards];
        const [movedCard] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === sourceColumn.id ? { ...col, cards: updatedCards } : col,
          ),
        );
      } else {
        const sourceCards = [...sourceColumn.cards];
        const destinationCards = [...destinationColumn.cards];
        const [movedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, movedCard);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === sourceColumn.id
              ? { ...col, cards: sourceCards }
              : col.id === destinationColumn.id
                ? { ...col, cards: destinationCards }
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
        <ColumnForm handleCloseModal={handleCloseFormModal} />
      </FormModal>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex items-start overflow-x-auto"
            >
              {columns.map((column, columnIndex) => (
                <ColumnDraggable
                  key={column.id}
                  column={column}
                  columnIndex={columnIndex}
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
