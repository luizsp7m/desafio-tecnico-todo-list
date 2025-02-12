import { useCreateItemModal } from "@/hooks/use-create-item-modal";
import { Button } from "./ui/button";
import { CreateItemModal } from "./create-item-modal";
import { CreateItemForm } from "./create-item-form";
import { useBoard } from "@/hooks/use-board";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Trash } from "lucide-react";

export function Board() {
  const {
    createItemModalIsOpen,
    handleOpenCreateItemModal,
    handleCloseCreateItemModal,
  } = useCreateItemModal();

  const { categories, setCategories, deleteCategory } = useBoard();

  function onDragEnd(result: DropResult<string>) {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === "category") {
      const reorderedCategories = [...categories];
      const [movedColumn] = reorderedCategories.splice(source.index, 1);
      reorderedCategories.splice(destination.index, 0, movedColumn);
      setCategories(reorderedCategories);
    }

    if (type === "todo") {
      const sourceCategory = categories.find(
        (cat) => cat.id === source.droppableId,
      );
      const destinationCategory = categories.find(
        (cat) => cat.id === destination.droppableId,
      );

      if (!sourceCategory || !destinationCategory) return;

      if (sourceCategory.id === destinationCategory.id) {
        const updatedTodos = [...sourceCategory.todos];
        const [movedTodo] = updatedTodos.splice(source.index, 1);
        updatedTodos.splice(destination.index, 0, movedTodo);

        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === sourceCategory.id
              ? { ...cat, todos: updatedTodos }
              : cat,
          ),
        );
      } else {
        const sourceTodos = [...sourceCategory.todos];
        const destinationTodos = [...destinationCategory.todos];
        const [movedTodo] = sourceTodos.splice(source.index, 1);
        destinationTodos.splice(destination.index, 0, movedTodo);

        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === sourceCategory.id
              ? { ...cat, todos: sourceTodos }
              : cat.id === destinationCategory.id
                ? { ...cat, todos: destinationTodos }
                : cat,
          ),
        );
      }
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleOpenCreateItemModal}>Adicionar categoria</Button>

      <CreateItemModal
        isOpen={createItemModalIsOpen}
        handleCloseModal={handleCloseCreateItemModal}
      >
        <CreateItemForm
          type="category"
          handleCloseModal={handleCloseCreateItemModal}
        />
      </CreateItemModal>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="category" direction="horizontal">
          {(provided) => (
            <div
              className="flex space-x-3 overflow-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categories.map((category, colIndex) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={colIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="w-64 rounded bg-secondary"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="flex cursor-grab items-center justify-between border-b border-b-primary-foreground p-3 text-sm"
                      >
                        {category.title}

                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash />
                        </Button>
                      </div>

                      <Droppable droppableId={category.id} type="todo">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="min-h-[128px]"
                          >
                            {category.todos.map((todo, todoIndex) => (
                              <Draggable
                                key={todo.id}
                                draggableId={todo.id}
                                index={todoIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="cursor-pointer bg-zinc-700 p-3 text-sm"
                                  >
                                    {todo.title}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
