import clsx from "clsx";

import { Card } from "@/types/card";
import { Draggable } from "@hello-pangea/dnd";
import { Calendar } from "lucide-react";
import { dateFormatter } from "@/utils/date-formatter";

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
            "mb-2 space-y-2 truncate rounded bg-white p-3 text-sm text-muted-foreground shadow-sm dark:bg-zinc-700 dark:text-white",

            {
              "bg-zinc-300 dark:bg-zinc-500": snapshot.isDragging,
            },
          )}
        >
          <span className="truncate">{card.title}</span>

          {card.dueDate && (
            <div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span className="text-[0.75rem]">
                  {dateFormatter(card.dueDate)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
