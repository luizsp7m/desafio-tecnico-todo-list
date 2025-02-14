import { render, screen } from "@testing-library/react";
import { FormModal, FormModalProps } from "../form-modal";
import { userEvent } from "@testing-library/user-event";

const handleCloseModalMock = vi.fn();

const formModalMock: FormModalProps = {
  isOpen: false,
  handleCloseModal: handleCloseModalMock,
  children: <span>Content</span>,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("FormModal", () => {
  it("should not be on screen", () => {
    render(<FormModal {...formModalMock} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should be on screen", () => {
    render(<FormModal {...formModalMock} isOpen />);
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
  });

  it("should render the child", () => {
    render(<FormModal {...formModalMock} isOpen />);
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it("should close the modal when clicking on the button", async () => {
    render(<FormModal {...formModalMock} isOpen />);
    expect(screen.queryByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(handleCloseModalMock).toBeCalled();
  });
});
