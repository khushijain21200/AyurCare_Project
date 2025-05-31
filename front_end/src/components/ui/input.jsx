// components/ui/input.jsx
import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
