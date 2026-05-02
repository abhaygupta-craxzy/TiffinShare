import React from "react";
import "../styles/theme.css";

export default function Button({ children, variant="primary", ...props }) {
  const cls =
    variant === "primary" ? "btn-primary" :
    variant === "secondary" ? "btn-secondary" :
    "btn-primary";
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}