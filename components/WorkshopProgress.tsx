"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { getProgress, saveProgress } from "@/lib/progress";

const workshopSteps = [
  { path: "/workshop/day-one", label: "Day 1" },
  { path: "/workshop/day-two", label: "Day 2" },
  { path: "/workshop/day-three", label: "Day 3" },
  { path: "/workshop/completion", label: "Completion" },
];

export default function WorkshopProgress() {
  const pathname = usePathname();
  
  // Save current page visit to localStorage when component mounts or path changes
  useEffect(() => {
    if (pathname.startsWith('/workshop/')) {
      saveProgress('workshop', pathname);
    }
  }, [pathname]);
  
  // Get progress from localStorage
  const { workshop } = getProgress();
  const completedPages = workshop.completedPages;
  
  // Calculate the current progress index
  const currentIndex = workshopSteps.findIndex(step => step.path === pathname);
  const highestCompletedIndex = Math.max(
    currentIndex,
    ...workshopSteps.map((step, index) => 
      completedPages.includes(step.path) ? index : -1
    )
  );
  
  // Calculate progress percentage
  const progressPercentage = Math.round((highestCompletedIndex / (workshopSteps.length - 1)) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-teal-700">Workshop Progress</h3>
        <span className="text-sm font-medium text-teal-700">{progressPercentage}% Complete</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Steps */}
      <div className="flex justify-between mt-4">
        {workshopSteps.map((step, index) => {
          const isCompleted = completedPages.includes(step.path) || index <= currentIndex;
          const isCurrent = step.path === pathname;
          
          return (
            <Link 
              key={step.path} 
              href={step.path}
              className={`flex flex-col items-center ${isCompleted ? 'text-teal-700' : 'text-gray-400'} ${isCurrent ? 'font-bold' : ''}`}
            >
              <div className="flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs mt-1">{step.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 