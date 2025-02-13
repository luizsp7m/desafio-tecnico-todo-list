import clsx from "clsx";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface FormModalProps {
  isOpen: boolean;
  lgModal?: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
}

export function FormModal({
  isOpen,
  lgModal = false,
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
      <DialogContent
        className={clsx("", {
          "max-w-3xl": lgModal,
        })}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Title</DialogTitle>
          <DialogDescription className="sr-only">Description</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
