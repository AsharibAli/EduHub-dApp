import React from "react";
import { LucideIcon } from "lucide-react";

type ContentCardProps = {
  title?: string;
  titleIcon?: LucideIcon;
  variant?: "default" | "highlighted" | "subdued";
  borderLeft?: boolean;
  children: React.ReactNode;
  className?: string;
};

const variantStyles = {
  default: "bg-white border-gray-200",
  highlighted: "bg-teal-50 border-teal-200",
  subdued: "bg-gray-50 border-gray-200",
};

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  titleIcon: Icon,
  variant = "default",
  borderLeft = false,
  children,
  className = "",
}) => {
  const baseStyle = "p-5 rounded-lg border";
  const borderLeftStyle = borderLeft ? "border-l-4" : "";
  const style = `${baseStyle} ${borderLeftStyle} ${variantStyles[variant]} ${className}`;

  return (
    <div className={style}>
      {title && (
        <div className="flex items-center mb-3">
          {Icon && <Icon className="w-5 h-5 mr-2 text-teal-600" />}
          <h3 className="text-lg font-semibold text-teal-600">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default ContentCard;
