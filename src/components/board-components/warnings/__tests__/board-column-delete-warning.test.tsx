import { render, screen } from "@testing-library/react";
import { BoardColumnDeleteWarning } from "../board-column-delete-warning";
import { useBoardColumnDeleteWarningStore } from "@/store/board-column-delete-warning-store";
import { userEvent } from "@testing-library/user-event";
import { useBoardStore } from "@/store/board-store";
import { boardColumnMock } from "@/mocks/board-column-mock";

describe("BoardColumnDeleteWarning", () => {
  it("should not display alert dialog initially", () => {
    render(<BoardColumnDeleteWarning />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("should display alert dialog when isOpen is true", () => {
    useBoardColumnDeleteWarningStore.setState({
      boardColumnDeleteWarningIsOpen: true,
      selectedBoardColumn: boardColumnMock,
    });

    render(<BoardColumnDeleteWarning />);
    expect(screen.queryByRole("alertdialog")).toBeInTheDocument();
  });

  it("should close the alert dialog when clicking the cancel button", async () => {
    const handleCloseBoardColumnDeleteWarningMock = vi.fn();

    useBoardColumnDeleteWarningStore.setState({
      boardColumnDeleteWarningIsOpen: true,
      selectedBoardColumn: boardColumnMock,
      handleCloseBoardColumnDeleteWarning:
        handleCloseBoardColumnDeleteWarningMock,
    });

    handleCloseBoardColumnDeleteWarningMock.mockImplementation(() => {
      useBoardColumnDeleteWarningStore.setState({
        boardColumnDeleteWarningIsOpen: false,
        selectedBoardColumn: null,
      });
    });

    render(<BoardColumnDeleteWarning />);

    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(handleCloseBoardColumnDeleteWarningMock).toHaveBeenCalled();

    expect(
      useBoardColumnDeleteWarningStore.getState()
        .boardColumnDeleteWarningIsOpen,
    ).toBe(false);

    expect(
      useBoardColumnDeleteWarningStore.getState().selectedBoardColumn,
    ).toBe(null);
  });

  it("should call handleDeleteBoardColumn when 'Continuar' button is clicked", async () => {
    const handleCloseBoardColumnDeleteWarningMock = vi.fn();
    const deleteBoardColumnMock = vi.fn();

    useBoardColumnDeleteWarningStore.setState({
      boardColumnDeleteWarningIsOpen: true,
      selectedBoardColumn: boardColumnMock,
      handleCloseBoardColumnDeleteWarning:
        handleCloseBoardColumnDeleteWarningMock,
    });

    handleCloseBoardColumnDeleteWarningMock.mockImplementation(() => {
      useBoardColumnDeleteWarningStore.setState({
        boardColumnDeleteWarningIsOpen: false,
        selectedBoardColumn: null,
      });
    });

    useBoardStore.setState({
      deleteBoardColumn: deleteBoardColumnMock,
    });

    render(<BoardColumnDeleteWarning />);

    await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

    expect(deleteBoardColumnMock).toHaveBeenCalledWith(boardColumnMock.id);

    expect(handleCloseBoardColumnDeleteWarningMock).toHaveBeenCalled();

    expect(
      useBoardColumnDeleteWarningStore.getState()
        .boardColumnDeleteWarningIsOpen,
    ).toBe(false);

    expect(
      useBoardColumnDeleteWarningStore.getState().selectedBoardColumn,
    ).toBe(null);
  });
});
