import { ReactElement } from "react";

type Variant = "primary" | "secondary";
export interface ButtonProps {
  variant: Variant;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const varientStyles = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-600",
};

const defaultStyles = "rounded-md p-4 flex cursor-pointer m-2 items-center";

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${varientStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
      {props.text} {props.endIcon}
    </button>
  );
};
