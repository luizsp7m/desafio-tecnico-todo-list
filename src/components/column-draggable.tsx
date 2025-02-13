import { Column } from "@/types/column";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { CardDraggable } from "./card-draggable";
import { FormModal } from "./form-modal";
import { useFormModal } from "@/hooks/use-form-modal";
import { ColumnHeaderDropdown } from "./column-header-dropdown";
import { Card } from "@/types/card";
import { CardForm } from "./card-form";
import { useDeleteAlert } from "@/hooks/use-delete-alert";
import { DeleteColumnAlert } from "./delete-column-alert";
import { useBoard } from "@/hooks/use-board";
import { ColumnForm } from "./column-form";

interface ColumnDraggableProps {
  column: Column;
  columnIndex: number;
}

export function ColumnDraggable({ column, columnIndex }: ColumnDraggableProps) {
  const {
    formModalIsOpen: columnFormModalIsOpen,
    selectedItem: selectedColumn,
    handleOpenFormModal: handleOpenColumnFormModal,
    handleCloseFormModal: handleCloseColumnFormModal,
  } = useFormModal<Column>();

  const {
    formModalIsOpen: cardFormModalIsOpen,
    selectedItem: selectedCard,
    handleOpenFormModal: handleOpenCardFormModal,
    handleCloseFormModal: handleCloseCardModalModal,
  } = useFormModal<Card>();

  const { deleteAlertIsOpen, handleOpenDeleteAlert, handleCloseDeleteAlert } =
    useDeleteAlert();

  const { deleteColumn } = useBoard();

  function handleDeleteColumn() {
    deleteColumn(column.id);
    handleCloseDeleteAlert();
  }

  return (
    <>
      <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mr-3 w-64 rounded bg-secondary shadow-sm"
          >
            <div
              {...provided.dragHandleProps}
              className="flex cursor-grab items-center justify-between border-b p-3 text-sm dark:border-b-primary/10"
            >
              {column.title}

              <ColumnHeaderDropdown
                handleOpenColumnFormModal={() =>
                  handleOpenColumnFormModal(column)
                }
                handleOpenDeleteAlert={handleOpenDeleteAlert}
              />
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
                      handleOpenFormModal={() => handleOpenCardFormModal(card)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <button
              onClick={() => handleOpenCardFormModal()}
              className="flex w-full items-center justify-center gap-2 border-t p-3 text-sm dark:border-t-primary/10"
            >
              <Plus size={16} />
              Adicionar tarefa
            </button>
          </div>
        )}
      </Draggable>

      <FormModal
        isOpen={columnFormModalIsOpen}
        handleCloseModal={handleCloseColumnFormModal}
      >
        <ColumnForm
          handleCloseModal={handleCloseColumnFormModal}
          selectedColumn={selectedColumn}
        />
      </FormModal>

      <FormModal
        isOpen={cardFormModalIsOpen}
        handleCloseModal={handleCloseCardModalModal}
      >
        <CardForm
          columnId={column.id}
          handleCloseModal={handleCloseCardModalModal}
          selectedCard={selectedCard}
        />
      </FormModal>

      <DeleteColumnAlert
        isOpen={deleteAlertIsOpen}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        handleDeleteColumn={handleDeleteColumn}
      />
    </>
  );
}
