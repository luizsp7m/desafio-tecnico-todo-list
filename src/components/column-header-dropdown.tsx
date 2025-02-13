import { EllipsisVertical, Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { FormModal } from "./form-modal";
import { ColumnForm } from "./column-form";
import { useFormModal } from "@/hooks/use-form-modal";
import { Column } from "@/types/column";

interface ColumnHeaderDropdownProps {
  column: Column;
  handleOpenDeleteAlert: () => void;
}

export function ColumnHeaderDropdown({
  column,
  handleOpenDeleteAlert,
}: ColumnHeaderDropdownProps) {
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

          <DropdownMenuItem onClick={handleOpenDeleteAlert}>
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
