import { useState } from "react";

export function useCreateItemModal() {
  const [createItemModalIsOpen, setCreateItemModalIsOpen] = useState(false);

  function handleOpenCreateItemModal() {
    setCreateItemModalIsOpen(true);
  }

  function handleCloseCreateItemModal() {
    setCreateItemModalIsOpen(false);
  }

  return {
    createItemModalIsOpen,
    handleOpenCreateItemModal,
    handleCloseCreateItemModal,
  };
}
