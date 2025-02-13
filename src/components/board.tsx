import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { BoardColumnDraggable } from "./board-column-draggable";
import { useBoardStore } from "@/store/board-store";

export function Board() {
  const { boardColumns, setBoardColumns } = useBoardStore();

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

        setBoardColumns(
          boardColumns.map((col) =>
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

        setBoardColumns(
          boardColumns.map((col) =>
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="boardColumn" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-1 items-start overflow-x-auto pb-3 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2"
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
  );
}
