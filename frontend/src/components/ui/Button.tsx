import { ReactElement } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
export interface ButtonProps {
  variant: Variant;
  size: Size;
  text: string;
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  onClick: () => void;
}

const varientStyles: Record<Variant, string> = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-600",
};

const sizeStyles: Record<Size, string> = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-4 px-6 text-lg",
};

const defaultStyles = "rounded-md p-4 flex cursor-pointer m-2 items-center";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${varientStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
};
