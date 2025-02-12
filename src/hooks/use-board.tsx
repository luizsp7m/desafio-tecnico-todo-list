import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";

export function useBoard() {
  return useContext(BoardContext);
}
