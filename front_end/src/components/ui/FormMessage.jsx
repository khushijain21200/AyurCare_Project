import React from "react";

export const FormMessage = ({ children }) => {
  return (
    <p className="text-red-600 text-sm mt-1">
      {children}
    </p>
  );
};
