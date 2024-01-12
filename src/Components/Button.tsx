import { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

interface ButtonPros {
  children: ReactNode;
  width?: number;

  bgColor?: string;
  type: string;
  zIndex?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  width,
  type,
  bgColor,
  onClick,
}: ButtonPros) => {
  return (
    <button
      className="button"
      onClick={onClick && onClick}
      style={{
        width: `${width}rem` || ``,

        backgroundColor: bgColor || "hsl(210, 100%, 59%)",
        border: `1px solid ${bgColor || "hsl(210, 100%, 59%)"}`,
      }}
      value={type}
    >
      {children}
    </button>
  );
};

export default Button;
