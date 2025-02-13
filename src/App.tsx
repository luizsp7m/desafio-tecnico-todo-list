import { Board } from "./components/board";
import { ModeToggle } from "./components/layout-components/mode-toggle";
import { BoardProvider } from "./contexts/board-context";
import { ThemeProvider } from "./contexts/theme-context";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BoardProvider>
        <div className="flex h-svh flex-col gap-3 p-3">
          <ModeToggle />
          <Board />
        </div>
      </BoardProvider>
    </ThemeProvider>
  );
}
