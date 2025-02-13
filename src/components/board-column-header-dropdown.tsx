import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BoardColumnHeaderDropdownProps {
  handleOpenBoardColumnFormModal: () => void;
  handleOpenDeleteAlert: () => void;
}

export function BoardColumnHeaderDropdown({
  handleOpenBoardColumnFormModal,
  handleOpenDeleteAlert,
}: BoardColumnHeaderDropdownProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleOpenBoardColumnFormModal}>
            <Pen /> Renomear
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleOpenDeleteAlert}>
            <Trash />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
