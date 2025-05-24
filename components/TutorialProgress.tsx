"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { getProgress, saveProgress } from "@/lib/progress";

// Define the tutorial paths - adjust these based on your actual tutorial structure
const tutorialSteps = [
  { path: "/tutorial/ocid/introduction", label: "OCID Intro" },
  { path: "/tutorial/ocid/setup", label: "OCID Setup" },
  { path: "/tutorial/ocid/production", label: "OCID Production" },
  { path: "/tutorial/oca/introduction", label: "OCA Intro" },
  { path: "/tutorial/smart-contract", label: "Smart Contracts" },
  { path: "/tutorial/completion", label: "Completion" },
];

export default function TutorialProgress() {
  const pathname = usePathname();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [completedPages, setCompletedPages] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Mark that we're now client-side rendering
    setIsClient(true);
    
    // Get progress from localStorage
    const { tutorial } = getProgress();
    setCompletedPages(tutorial.completedPages);
    
    // Save current page visit to localStorage
    if (pathname.startsWith('/tutorial/')) {
      saveProgress('tutorial', pathname);
      
      // Update completed pages
      setCompletedPages(prev => {
        if (!prev.includes(pathname)) {
          return [...prev, pathname];
        }
        return prev;
      });
    }
    
    // Find current step index
    const currentStepIndex = tutorialSteps.findIndex(step => pathname.startsWith(step.path));
    
    // Find the highest completed step index
    const highestCompletedIndex = Math.max(
      currentStepIndex,
      ...tutorialSteps.map((step, index) => 
        tutorial.completedPages.some(page => page.startsWith(step.path)) ? index : -1
      )
    );
    
    // Calculate and set progress percentage
    const progress = Math.round((highestCompletedIndex / (tutorialSteps.length - 1)) * 100);
    setProgressPercentage(progress);
  }, [pathname]);
  
  // Find current step index for display purposes
  const currentStepIndex = tutorialSteps.findIndex(step => pathname.startsWith(step.path));
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-teal-700">Tutorial Progress</h3>
        {/* Only show percentage on client side */}
        <span className="text-sm font-medium text-teal-700">
          {isClient ? `${progressPercentage}% Complete` : ''}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: isClient ? `${progressPercentage}%` : '0%' }}
        ></div>
      </div>
      
      {/* Steps - showing as dots for space efficiency in tutorial */}
      <div className="flex justify-between mt-4">
        {tutorialSteps.map((step, index) => {
          const isCompleted = isClient && (
            completedPages.some(page => page.startsWith(step.path)) || 
            index <= currentStepIndex
          );
          const isCurrent = pathname.startsWith(step.path);
          
          return (
            <Link 
              key={step.path} 
              href={step.path}
              className={`flex flex-col items-center ${isCompleted ? 'text-teal-700' : 'text-gray-400'} ${isCurrent ? 'font-bold' : ''}`}
            >
              <div className="flex items-center justify-center">
                {isClient && isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs mt-1 hidden md:inline-block">{step.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 