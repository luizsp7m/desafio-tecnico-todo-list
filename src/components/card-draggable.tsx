import clsx from "clsx";

import { Card } from "@/types/card";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  card: Card;
  cardIndex: number;
  handleOpenFormModal: () => void;
}

export function CardDraggable({
  card,
  cardIndex,
  handleOpenFormModal,
}: CardProps) {
  return (
    <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpenFormModal}
          className={clsx(
            "mb-2 rounded bg-white p-3 text-sm text-muted-foreground dark:bg-zinc-700 dark:text-white",

            {
              "bg-zinc-300 dark:bg-zinc-500": snapshot.isDragging,
            },
          )}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}
