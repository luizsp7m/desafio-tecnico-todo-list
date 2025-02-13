import { AddBoardColumnButton } from "./components/add-board-column-button";
import { Board } from "./components/board";
import { BoardColumnFormModal } from "./components/board-column-form-modal";
import { ModeToggle } from "./components/mode-toggle";
import { TaskCardFormModal } from "./components/task-card-form-modal";
import { ThemeProvider } from "./contexts/theme-context";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col gap-3 p-3">
        <div className="flex gap-3">
          <ModeToggle />
          <AddBoardColumnButton />
        </div>

        <Board />
        <BoardColumnFormModal />
        <TaskCardFormModal />
      </div>
    </ThemeProvider>
  );
}
