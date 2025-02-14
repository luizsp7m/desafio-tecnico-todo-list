import { BoardColumn } from "@/types/board-column";
import { create } from "zustand";

interface BoardColumnDeleteWarningStoreProps {
  boardColumnDeleteWarningIsOpen: boolean;
  selectedBoardColumn: BoardColumn | null;

  handleOpenBoardColumnDeleteWarning: ({
    selectedBoardColumn,
  }: {
    selectedBoardColumn: BoardColumn | null;
  }) => void;

  handleCloseBoardColumnDeleteWarning: () => void;
}

export const useBoardColumnDeleteWarningStore =
  create<BoardColumnDeleteWarningStoreProps>((set) => ({
    boardColumnDeleteWarningIsOpen: false,
    selectedBoardColumn: null,

    handleOpenBoardColumnDeleteWarning: ({ selectedBoardColumn }) =>
      set(() => ({
        selectedBoardColumn,
        boardColumnDeleteWarningIsOpen: true,
      })),

    handleCloseBoardColumnDeleteWarning: () =>
      set(() => ({
        boardColumnDeleteWarningIsOpen: false,
        selectedBoardColumn: null,
      })),
  }));
