import { Column } from "@/types/column";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { CardDraggable } from "./card-draggable";
import { FormModal } from "./form-modal";
import { useFormModal } from "@/hooks/use-form-modal";
import { ColumnHeaderDropdown } from "./column-header-dropdown";
import { Card } from "@/types/card";
import { CardForm } from "./card-form";

interface ColumnDraggableProps {
  column: Column;
  columnIndex: number;
}

export function ColumnDraggable({ column, columnIndex }: ColumnDraggableProps) {
  const {
    formModalIsOpen,
    selectedItem: selectedCard,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Card>();

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

              <ColumnHeaderDropdown column={column} />
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
                      handleOpenFormModal={() => handleOpenFormModal(card)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <button
              onClick={() => handleOpenFormModal()}
              className="flex w-full items-center justify-center gap-2 border-t p-3 text-sm dark:border-t-primary/10"
            >
              <Plus size={16} />
              Adicionar tarefa
            </button>
          </div>
        )}
      </Draggable>

      <FormModal
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <CardForm
          columnId={column.id}
          handleCloseModal={handleCloseFormModal}
          selectedCard={selectedCard}
        />
      </FormModal>
    </>
  );
}
