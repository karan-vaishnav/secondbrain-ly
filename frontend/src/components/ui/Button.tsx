import React from "react";
import { Loader2 } from "lucide-react/icons";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
export interface ButtonProps {
  variant: Variant;
  size: Size;
  text: string;
  startIcon?: (props: { size: Size }) => React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
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
  "rounded-md p-4 flex cursor-pointer items-center font-light transition-opacity disabled:opacity-50";

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  onClick,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={loading}
      className={`${varientStyles[variant]} ${defaultStyles} ${sizeStyles[size]}`}
    >
      {loading ? (
        <Loader2 className="animate-spin mr-2" size={18} />
      ) : (
        startIcon && <span className="mr-2">{startIcon({ size })}</span>
      )}
      {loading ? "Loading..." : text}
    </button>
  );
};
