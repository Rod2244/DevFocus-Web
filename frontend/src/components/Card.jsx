import React from "react";

export default function Card({ className = "", children }) {
  return (
    <div className={`bg-[#1E1E1E] rounded-2xl shadow-sm shadow-black/30 p-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
