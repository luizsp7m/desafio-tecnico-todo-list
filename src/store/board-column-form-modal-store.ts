import { BoardColumn } from "@/types/board-column";
import { create } from "zustand";

interface BoardColumnFormModalStoreProps {
  boardColumnFormModalIsOpen: boolean;
  selectedBoardColumn: BoardColumn | null;

  handleOpenBoardColumnFormModal: ({
    selectedBoardColumn,
  }: {
    selectedBoardColumn: BoardColumn | null;
  }) => void;

  handleCloseBoardColumnFormModal: () => void;
}

export const useBoardColumnFormModalStore =
  create<BoardColumnFormModalStoreProps>((set) => ({
    boardColumnFormModalIsOpen: false,
    selectedBoardColumn: null,

    handleOpenBoardColumnFormModal: ({ selectedBoardColumn }) =>
      set(() => ({
        selectedBoardColumn,
        boardColumnFormModalIsOpen: true,
      })),

    handleCloseBoardColumnFormModal: () =>
      set(() => ({
        boardColumnFormModalIsOpen: false,
        selectedBoardColumn: null,
      })),
  }));
