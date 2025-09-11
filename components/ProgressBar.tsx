"use client";

import { usePathname } from "next/navigation";

// Define the ecosystem guide steps with their paths and titles
export const ecosystemSteps = [
  {
    path: "/oc-ecosystem-guide/oc-ecosystem/introduction",
    title: "OC Ecosystem Introduction",
  },
  { path: "/oc-ecosystem-guide/ocid", title: "What is OCID?" },
  { path: "/oc-ecosystem-guide/oca", title: "What is OCA?" },
  { path: "/oc-ecosystem-guide/ocb", title: "What is OCB?" },
  { path: "/oc-ecosystem-guide/completion", title: "Completion" },
];

export default function ProgressBar() {
  const pathname = usePathname();
  const currentStepIndex = ecosystemSteps.findIndex(
    (step) => step.path === pathname
  );
  const progress = Math.round(
    ((currentStepIndex + 1) / ecosystemSteps.length) * 100
  );

  return (
    <div className="w-full mt-4 mb-8">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-teal-700 font-medium">Progress</span>
        <span className="text-teal-700 font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-3 text-xs text-teal-600">
        {currentStepIndex >= 0 ? (
          <span>Current Step: {ecosystemSteps[currentStepIndex]?.title}</span>
        ) : (
          <span>Getting Started</span>
        )}
      </div>
    </div>
  );
}
