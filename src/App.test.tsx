import { screen, render } from "@testing-library/react";
import { App } from "./App";

describe("App tests", () => {
  it("should render App component", () => {
    render(<App />);
    expect(screen.queryByTestId("app-container")).toBeInTheDocument();
  });
});
