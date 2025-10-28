import React from "react";

export function Button({ children, onClick, className = "", variant = "default" }) {
  const baseStyle =
    "px-5 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    default: "bg-[#c5f53b] text-black hover:bg-[#b7f03a]",
    outline:
      "border border-[#c5f53b] text-[#2b4a2b] bg-transparent hover:bg-[#e3ffb3]",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
