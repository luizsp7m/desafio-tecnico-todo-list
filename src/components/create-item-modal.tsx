import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface CreateItemModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
}

export function CreateItemModal({
  isOpen,
  handleCloseModal,
  children,
}: CreateItemModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseModal();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Title</DialogTitle>
          <DialogDescription className="sr-only">Description</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
