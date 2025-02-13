import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useBoard } from "@/hooks/use-board";
import { FormModal } from "./form-modal";
import { ColumnForm } from "./column-form";
import { useFormModal } from "@/hooks/use-form-modal";
import { Column } from "@/types/column";

interface ColumnHeaderDropdownProps {
  column: Column;
}

export function ColumnHeaderDropdown({ column }: ColumnHeaderDropdownProps) {
  const { deleteColumn } = useBoard();

  const {
    formModalIsOpen,
    selectedItem: selectedColumn,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Column>();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleOpenFormModal(column)}>
            <Pen /> Renomear
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => deleteColumn(column.id)}>
            <Trash />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormModal
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <ColumnForm
          handleCloseModal={handleCloseFormModal}
          selectedColumn={selectedColumn}
        />
      </FormModal>
    </>
  );
}
