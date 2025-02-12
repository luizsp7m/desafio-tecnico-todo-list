import { Board } from "./components/board";
import { ThemeProvider } from "./components/provider-components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto min-h-svh p-4">
        <Board />
      </div>
    </ThemeProvider>
  );
}
