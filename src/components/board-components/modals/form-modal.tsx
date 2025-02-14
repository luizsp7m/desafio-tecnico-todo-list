import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface FormModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
}

export function FormModal({
  isOpen,
  handleCloseModal,
  children,
}: FormModalProps) {
  if (!isOpen) return null;

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
