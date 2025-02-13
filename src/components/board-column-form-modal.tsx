import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { FormModal } from "./form-modal";
import { BoardColumnForm } from "./board-column-form";

export function BoardColumnFormModal() {
  const { boardColumnFormModalIsOpen, handleCloseBoardColumnFormModal } =
    useBoardColumnFormModalStore();

  return (
    <FormModal
      isOpen={boardColumnFormModalIsOpen}
      handleCloseModal={handleCloseBoardColumnFormModal}
    >
      <BoardColumnForm />
    </FormModal>
  );
}
