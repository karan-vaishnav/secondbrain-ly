import React from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
export interface ButtonProps {
  variant: Variant;
  size: Size;
  text: string;
  startIcon?: (props: { size: Size }) => React.ReactNode;
  onClick: () => void;
}

const varientStyles = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-600",
};

const sizeStyles = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-4 px-6 text-lg",
};

const defaultStyles =
  "rounded-md p-4 flex cursor-pointer m-2 items-center font-light";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${varientStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {props.startIcon && (
        <span className="mr-2">{props.startIcon({ size: props.size })}</span>
      )}
      {props.text}
    </button>
  );
};
