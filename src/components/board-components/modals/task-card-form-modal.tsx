import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";
import { FormModal } from "./form-modal";
import { TaskCardForm } from "../forms/task-card-form";

export function TaskCardFormModal() {
  const { taskCardFormModalIsOpen, handleCloseTaskCardFormModal } =
    useTaskCardFormModalStore();

  return (
    <FormModal
      isOpen={taskCardFormModalIsOpen}
      handleCloseModal={handleCloseTaskCardFormModal}
    >
      <TaskCardForm />
    </FormModal>
  );
}
