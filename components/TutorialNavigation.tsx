"use client";

import { usePathname } from "next/navigation";
import { tutorialSteps } from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";

export default function TutorialNavigation() {
  const pathname = usePathname();
  const currentIndex = tutorialSteps.findIndex(
    (step) => step.path === pathname
  );

  // If we're not on a tutorial page, don't render navigation
  if (currentIndex === -1) {
    return null;
  }

  const prevPath =
    currentIndex > 0 ? tutorialSteps[currentIndex - 1].path : undefined;
  const nextPath =
    currentIndex < tutorialSteps.length - 1
      ? tutorialSteps[currentIndex + 1].path
      : undefined;
  const nextLabel =
    currentIndex === tutorialSteps.length - 2 ? "Complete" : "Next";

  return (
    <NavigationButtons
      prevPath={prevPath}
      nextPath={nextPath}
      prevLabel="Previous"
      nextLabel={nextLabel}
      className="mt-8"
    />
  );
}
