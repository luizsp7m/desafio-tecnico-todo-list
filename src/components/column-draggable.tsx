import { Column } from "@/types/column";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { CardDraggable } from "./card-draggable";
import { useBoard } from "@/hooks/use-board";
import { CreateItemModal } from "./create-item-modal";
import { CreateItemForm } from "./create-item-form";
import { useFormModal } from "@/hooks/use-form-modal";

interface ColumnDraggableProps {
  column: Column;
  columnIndex: number;
}

export function ColumnDraggable({ column, columnIndex }: ColumnDraggableProps) {
  const { deleteColumn } = useBoard();

  const { formModalIsOpen, handleOpenFormModal, handleCloseFormModal } =
    useFormModal();

  return (
    <>
      <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="w-64 rounded bg-secondary"
          >
            <div
              {...provided.dragHandleProps}
              className="flex cursor-grab items-center justify-between border-b p-3 text-sm dark:border-b-primary/10"
            >
              {column.title}

              <Button
                size="icon"
                variant="secondary"
                onClick={() => deleteColumn(column.id)}
              >
                <Trash />
              </Button>
            </div>

            <Droppable droppableId={column.id} type="card">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="-mb-2 min-h-[128px] p-3"
                >
                  {column.cards.map((card, cardIndex) => (
                    <CardDraggable
                      key={card.id}
                      card={card}
                      cardIndex={cardIndex}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <button
              onClick={handleOpenFormModal}
              className="flex w-full items-center justify-center gap-2 border-t p-3 text-sm dark:border-t-primary/10"
            >
              <Plus size={16} />
              Adicionar tarefa
            </button>
          </div>
        )}
      </Draggable>

      <CreateItemModal
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <CreateItemForm
          type="card"
          handleCloseModal={handleCloseFormModal}
          columnId={column.id}
        />
      </CreateItemModal>
    </>
  );
}
