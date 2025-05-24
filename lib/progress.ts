export interface ProgressData {
  workshop: {
    lastVisitedPage: string;
    completedPages: string[];
  };
  tutorial: {
    lastVisitedPage: string;
    completedPages: string[];
  };
}

// Workshop page paths in order
const workshopPages = [
  '/workshop/day-one',
  '/workshop/day-two',
  '/workshop/day-three',
  '/workshop/completion'
];

// Function to save progress to localStorage
export const saveProgress = (type: 'workshop' | 'tutorial', pagePath: string): void => {
  // Skip if not in browser environment
  if (typeof window === 'undefined') return;

  try {
    // Get existing data or initialize
    const progressData: ProgressData = getProgress();
    
    // Update last visited page
    progressData[type].lastVisitedPage = pagePath;
    
    // Add to completed pages if not already there
    if (!progressData[type].completedPages.includes(pagePath)) {
      progressData[type].completedPages.push(pagePath);
    }
    
    // Save updated data
    localStorage.setItem('eduHub_progress', JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Function to get progress from localStorage
export const getProgress = (): ProgressData => {
  // Skip if not in browser environment
  if (typeof window === 'undefined') {
    return {
      workshop: { lastVisitedPage: '', completedPages: [] },
      tutorial: { lastVisitedPage: '', completedPages: [] }
    };
  }

  try {
    const storedProgress = localStorage.getItem('eduHub_progress');
    
    if (!storedProgress) {
      return {
        workshop: { lastVisitedPage: '', completedPages: [] },
        tutorial: { lastVisitedPage: '', completedPages: [] }
      };
    }
    
    return JSON.parse(storedProgress);
  } catch (error) {
    console.error('Error retrieving progress:', error);
    return {
      workshop: { lastVisitedPage: '', completedPages: [] },
      tutorial: { lastVisitedPage: '', completedPages: [] }
    };
  }
};

// Function to calculate progress percentage
export const calculateWorkshopProgress = (currentPath: string): number => {
  // Skip if not in browser environment
  if (typeof window === 'undefined') return 0;

  const { workshop } = getProgress();
  
  // Get the index of the current page
  const currentPageIndex = workshopPages.findIndex(page => page === currentPath);
  if (currentPageIndex === -1) return 0;
  
  // Calculate percentage (currentIndex / (total-1)) * 100
  return Math.round((currentPageIndex / (workshopPages.length - 1)) * 100);
};

// Function to get the next page path based on current progress
export const getNextPage = (type: 'workshop' | 'tutorial', currentPath: string): string => {
  if (type === 'workshop') {
    const currentIndex = workshopPages.findIndex(page => page === currentPath);
    if (currentIndex < workshopPages.length - 1) {
      return workshopPages[currentIndex + 1];
    }
  }
  
  // For tutorial or if we don't have a next page
  return '';
};

// Function to get the previous page path based on current path
export const getPreviousPage = (type: 'workshop' | 'tutorial', currentPath: string): string => {
  if (type === 'workshop') {
    const currentIndex = workshopPages.findIndex(page => page === currentPath);
    if (currentIndex > 0) {
      return workshopPages[currentIndex - 1];
    }
  }
  
  // For tutorial or if we don't have a previous page
  return '';
}; 