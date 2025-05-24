import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type NavigationButtonsProps = {
  prevPath?: string;
  nextPath?: string;
  prevLabel?: string;
  nextLabel?: string;
  centerButton?: {
    path: string;
    label: string;
  };
  className?: string;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  prevPath,
  nextPath,
  prevLabel = "Previous",
  nextLabel = "Next",
  centerButton,
  className = "",
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {prevPath ? (
        <Link href={prevPath}>
          <Button variant="outline">← {prevLabel}</Button>
        </Link>
      ) : (
        <div></div> // Empty div for spacing when no prev button
      )}

      {centerButton && (
        <Link href={centerButton.path}>
          <Button variant="outline">{centerButton.label}</Button>
        </Link>
      )}

      {nextPath ? (
        <Link href={nextPath}>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            {nextLabel} →
          </Button>
        </Link>
      ) : (
        <div></div> // Empty div for spacing when no next button
      )}
    </div>
  );
};

export default NavigationButtons;
