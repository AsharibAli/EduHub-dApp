"use client";

import { usePathname } from "next/navigation";
import { ecosystemSteps } from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";

export default function OCEcosystemNavigation() {
  const pathname = usePathname();
  const currentIndex = ecosystemSteps.findIndex(
    (step) => step.path === pathname
  );

  // If we're not on a guide page, don't render navigation
  if (currentIndex === -1) {
    return null;
  }

  const prevPath =
    currentIndex > 0 ? ecosystemSteps[currentIndex - 1].path : undefined;
  const nextPath =
    currentIndex < ecosystemSteps.length - 1
      ? ecosystemSteps[currentIndex + 1].path
      : undefined;
  const nextLabel =
    currentIndex === ecosystemSteps.length - 2 ? "Complete" : "Next";

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
