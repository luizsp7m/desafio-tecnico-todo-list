import { useCreateItemModal } from "@/hooks/use-create-item-modal";
import { Button } from "./ui/button";
import { CreateItemModal } from "./create-item-modal";
import { CreateItemForm } from "./create-item-form";

export function Board() {
  const {
    createItemModalIsOpen,
    handleOpenCreateItemModal,
    handleCloseCreateItemModal,
  } = useCreateItemModal();

  return (
    <div>
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
    </div>
  );
}
