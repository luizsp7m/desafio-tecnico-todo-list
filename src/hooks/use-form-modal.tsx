import { useState } from "react";

export function useFormModal() {
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);

  function handleOpenFormModal() {
    setFormModalIsOpen(true);
  }

  function handleCloseFormModal() {
    setFormModalIsOpen(false);
  }

  return {
    formModalIsOpen,
    handleOpenFormModal,
    handleCloseFormModal,
  };
}
