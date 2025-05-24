import React from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
  className?: string;
};

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-6 h-6",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "teal-600",
  text,
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full border-2 border-t-${color} border-r-${color} border-b-transparent border-l-transparent animate-spin`}
      ></div>
      {text && <span className={`text-${color}`}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
