import { Board } from "./components/board";
import { ModeToggle } from "./components/layout-components/mode-toggle";
import { BoardProvider } from "./contexts/BoardContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BoardProvider>
        <div className="mx-auto min-h-svh space-y-3 p-4">
          <ModeToggle />
          <Board />
        </div>
      </BoardProvider>
    </ThemeProvider>
  );
}
