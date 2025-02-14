import { render, screen } from "@testing-library/react";
import { BoardColumnForm } from "../board-column-form";
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { boardColumnMock } from "@/mocks/board-column-mock";
import { userEvent } from "@testing-library/user-event";
import { useBoardStore } from "@/store/board-store";

function getInputTitle() {
  return screen.getByTestId("title-input") as HTMLInputElement;
}

function getButtonSubmit() {
  return screen.getByTestId("submit-button");
}

const handleCloseBoardColumnFormModalMock = vi.fn();
const upsertBoardColumnMock = vi.fn();

beforeEach(() => {
  useBoardColumnFormModalStore.setState({
    selectedBoardColumn: null,
    handleCloseBoardColumnFormModal: handleCloseBoardColumnFormModalMock,
  });

  useBoardStore.setState({
    upsertBoardColumn: upsertBoardColumnMock,
  });
});

describe("BoardColumnForm", () => {
  it("should display on screen", () => {
    render(<BoardColumnForm />);
    expect(screen.getByTestId("form-container")).toBeInTheDocument();
  });

  it("should be a create form", () => {
    render(<BoardColumnForm />);
    expect(screen.getByText(/adicionar coluna/i)).toBeInTheDocument();
  });

  it("should be an update form", () => {
    useBoardColumnFormModalStore.setState({
      selectedBoardColumn: boardColumnMock,
    });

    render(<BoardColumnForm />);
    expect(screen.getByText(/atualizar coluna/i)).toBeInTheDocument();
  });

  it("should display empty fields", () => {
    render(<BoardColumnForm />);

    const inputTitle = getInputTitle();

    expect(inputTitle).toBeInTheDocument();
    expect(inputTitle.value).toBe("");
  });

  it("display fields with the correct values", () => {
    useBoardColumnFormModalStore.setState({
      selectedBoardColumn: boardColumnMock,
    });

    render(<BoardColumnForm />);

    const inputTitle = getInputTitle();

    expect(inputTitle).toBeInTheDocument();
    expect(inputTitle.value).toBe(boardColumnMock.title);
  });

  it("should display an error if you submit the form without title", async () => {
    render(<BoardColumnForm />);

    const submitButton = getButtonSubmit();

    await userEvent.click(submitButton);

    expect(
      screen.getByText(/o título deve ter pelo menos 3 caracteres/i),
    ).toBeInTheDocument();
  });

  it("should submit form", async () => {
    render(<BoardColumnForm />);

    const inputTitle = getInputTitle();
    const submitButton = getButtonSubmit();

    await userEvent.type(inputTitle, "VALID TITLE");
    await userEvent.click(submitButton);

    expect(upsertBoardColumnMock).toHaveBeenCalledWith({
      data: { title: "VALID TITLE" },
    });

    expect(handleCloseBoardColumnFormModalMock).toHaveBeenCalled();
  });
});
