import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { AddTaskCardButton } from "../add-task-card-button";
import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";

const mockBoardColumnId = "beff38be-5a8c-49a4-a8d8-f245aa7ec072";

describe("AddTaskCardButton", () => {
  it("should render a button", () => {
    render(<AddTaskCardButton boardColumnId={mockBoardColumnId} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render a button with the correct text", () => {
    render(<AddTaskCardButton boardColumnId={mockBoardColumnId} />);
    expect(screen.getByText(/adicionar tarefa/i)).toBeInTheDocument();
  });

  it("should call a function when clicking the button", async () => {
    render(<AddTaskCardButton boardColumnId={mockBoardColumnId} />);

    expect(useTaskCardFormModalStore.getState().taskCardFormModalIsOpen).toBe(
      false,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(useTaskCardFormModalStore.getState().taskCardFormModalIsOpen).toBe(
      true,
    );
  });

  it("should call the function with the correct parameters", async () => {
    render(<AddTaskCardButton boardColumnId={mockBoardColumnId} />);

    await userEvent.click(screen.getByRole("button"));

    expect(useTaskCardFormModalStore.getState().boardColumnId).toBe(
      mockBoardColumnId,
    );

    expect(useTaskCardFormModalStore.getState().selectedTaskCard).toBe(null);
  });
});
