import React from "react";
import { LucideIcon } from "lucide-react";

type AlertVariant = "info" | "warning" | "success" | "error";

type InfoAlertProps = {
  variant?: AlertVariant;
  icon?: LucideIcon;
  title?: string;
  children: React.ReactNode;
  className?: string;
  borderLeft?: boolean;
};

const variantStyles = {
  info: "bg-blue-50 border-blue-500 text-blue-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  success: "bg-teal-50 border-teal-200 text-teal-700",
  error: "bg-red-50 border-red-200 text-red-700",
};

const InfoAlert: React.FC<InfoAlertProps> = ({
  variant = "info",
  icon: Icon,
  title,
  children,
  className = "",
  borderLeft = false,
}) => {
  const baseStyle = "p-3 rounded-md flex items-start border";
  const borderLeftStyle = borderLeft ? "border-l-4" : "";
  const style = `${baseStyle} ${borderLeftStyle} ${variantStyles[variant]} ${className}`;

  return (
    <div className={style}>
      {Icon && (
        <Icon
          className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-${
            variant === "info"
              ? "blue"
              : variant === "warning"
              ? "amber"
              : variant === "success"
              ? "teal"
              : "red"
          }-500`}
        />
      )}
      <div>
        {title && <p className="font-medium text-sm">{title}</p>}
        <div className={`${title ? "mt-1 text-xs" : "text-sm"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
