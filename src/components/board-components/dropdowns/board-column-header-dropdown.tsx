import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BoardColumn } from "@/types/board-column";
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { useBoardColumnDeleteWarningStore } from "@/store/board-column-delete-warning-store";

interface BoardColumnHeaderDropdownProps {
  boardColumn: BoardColumn;
}

export function BoardColumnHeaderDropdown({
  boardColumn,
}: BoardColumnHeaderDropdownProps) {
  const { handleOpenBoardColumnFormModal } = useBoardColumnFormModalStore();
  const { handleOpenBoardColumnDeleteWarning } =
    useBoardColumnDeleteWarningStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            handleOpenBoardColumnFormModal({ selectedBoardColumn: boardColumn })
          }
        >
          <Pen /> Renomear
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            handleOpenBoardColumnDeleteWarning({
              selectedBoardColumn: boardColumn,
            })
          }
        >
          <Trash />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
