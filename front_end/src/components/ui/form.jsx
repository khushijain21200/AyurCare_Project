import React from "react";

export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded-2xl shadow-md">
      {children}
    </form>
  );
};
