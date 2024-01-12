import { ReactNode } from "react";
import "./Board.css";

interface BoardProps {
  children: ReactNode;
}

const Board = ({ children }: BoardProps) => {
  return <div className="board">{children}</div>;
};
export default Board;
