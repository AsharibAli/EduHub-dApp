import React from "react";
import { Check } from "lucide-react";

type CheckItemProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  checkClassName?: string;
};

const CheckItem: React.FC<CheckItemProps> = ({
  children,
  title,
  className = "",
  checkClassName = "text-teal-500",
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <Check className={`h-6 w-6 ${checkClassName} mr-2 flex-shrink-0`} />
      <div>
        {title && <strong>{title}:</strong>} {children}
      </div>
    </div>
  );
};

export default CheckItem;
