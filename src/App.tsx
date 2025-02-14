import { BoardColumnFormModal } from "./components/board-components/modals/board-column-form-modal";
import { ModeToggle } from "./components/ui/mode-toggle";
import { TaskCardFormModal } from "./components/board-components/modals/task-card-form-modal";
import { ThemeProvider } from "./components/provider-components/theme-provider";
import { Board } from "./components/board-components/board";
import { AddBoardColumnButton } from "./components/board-components/buttons/add-board-column-button";
import { BoardColumnDeleteWarning } from "./components/board-components/warnings/board-column-delete-warning";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="flex min-h-svh flex-col gap-3 p-3"
        data-testid="app-container"
      >
        <div className="flex gap-3">
          <ModeToggle />
          <AddBoardColumnButton />
        </div>

        <Board />

        <BoardColumnFormModal />
        <TaskCardFormModal />
        <BoardColumnDeleteWarning />
      </div>
    </ThemeProvider>
  );
}
