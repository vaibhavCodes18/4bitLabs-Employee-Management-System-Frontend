import React from "react";

/**
 * Inline spinner for buttons.
 * Usage: <ButtonSpinner /> or <ButtonSpinner size="lg" />
 */
const ButtonSpinner = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    xs: "w-3 h-3 border-[1.5px]",
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-6 h-6 border-[2.5px]",
  };

  return (
    <span
      className={`inline-block ${sizeClasses[size]} border-current border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default ButtonSpinner;
