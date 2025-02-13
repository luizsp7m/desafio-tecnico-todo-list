import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ColumnHeaderDropdownProps {
  handleOpenColumnFormModal: () => void;
  handleOpenDeleteAlert: () => void;
}

export function ColumnHeaderDropdown({
  handleOpenColumnFormModal,
  handleOpenDeleteAlert,
}: ColumnHeaderDropdownProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleOpenColumnFormModal}>
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
