"use client";

import { usePathname } from "next/navigation";

// Define the tutorial steps with their paths and titles
export const tutorialSteps = [
  { path: "/tutorial/ocid/introduction", title: "OCID Introduction" },
  { path: "/tutorial/ocid/setup", title: "OCID Setup" },
  { path: "/tutorial/ocid/production", title: "OCID Production" },
  { path: "/tutorial/oca/introduction", title: "OCA Introduction" },
  { path: "/tutorial/oca/issuing", title: "Issuing OCA" },
  { path: "/tutorial/oca/verification", title: "Verifying OCA" },
  { path: "/tutorial/smart-contract", title: "Smart Contract" },
  { path: "/tutorial/completion", title: "Completion" }
];

export default function ProgressBar() {
  const pathname = usePathname();
  const currentStepIndex = tutorialSteps.findIndex(step => step.path === pathname);
  const progress = Math.round(((currentStepIndex + 1) / tutorialSteps.length) * 100);
  
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
          <span>Current Step: {tutorialSteps[currentStepIndex]?.title}</span>
        ) : (
          <span>Getting Started</span>
        )}
      </div>
    </div>
  );
} 