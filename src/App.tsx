import { Button } from "./components/ui/button";

export function App() {
  return (
    <div className="flex flex-col items-start gap-2 p-4 pt-2">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </div>
  );
}
