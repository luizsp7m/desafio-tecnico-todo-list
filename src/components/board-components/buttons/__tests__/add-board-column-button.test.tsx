import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { AddBoardColumnButton } from "../add-board-column-button";

describe("AddBoardColumnButton", () => {
  it("should render a button", () => {
    render(<AddBoardColumnButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render a button with the correct text", () => {
    render(<AddBoardColumnButton />);
    expect(screen.getByText(/adicionar coluna/i)).toBeInTheDocument();
  });

  it("should call a function when clicking the button", async () => {
    render(<AddBoardColumnButton />);

    expect(
      useBoardColumnFormModalStore.getState().boardColumnFormModalIsOpen,
    ).toBe(false);

    await userEvent.click(screen.getByRole("button"));

    expect(
      useBoardColumnFormModalStore.getState().boardColumnFormModalIsOpen,
    ).toBe(true);
  });
});
