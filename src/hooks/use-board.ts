import { BoardContext } from "@/contexts/board-context";
import { useContext } from "react";

export function useBoard() {
  return useContext(BoardContext);
}
