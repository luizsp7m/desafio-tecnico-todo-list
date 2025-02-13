import { useState } from "react";

export function useDeleteAlert() {
  const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false);

  function handleOpenDeleteAlert() {
    setDeleteAlertIsOpen(true);
  }

  function handleCloseDeleteAlert() {
    setDeleteAlertIsOpen(false);
  }

  return {
    deleteAlertIsOpen,
    handleOpenDeleteAlert,
    handleCloseDeleteAlert,
  };
}
