import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
}

const OCButton: React.FC<OCButtonProps> = ({
  onClick,
  children,
  variant = "default",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border-2 border-black text-black hover:bg-gray-100",
  };

  const sizes = {
    xs: "px-3 py-1 text-sm",
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-2.5 text-lg",
  };

  const iconSizes = {
    xs: "h-5 w-5",
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-8 w-8",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        <svg
          className={iconSizes[size]}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
        >
          <path
            d="M24.8855 10.2053C22.4605 10.2348 20.0985 10.9636 18.0969 12.3001C16.0952 13.6365 14.5432 15.5209 13.6361 17.7161C12.729 19.9114 12.5073 22.3194 12.9989 24.6373C13.4906 26.9552 14.6735 29.0794 16.399 30.7427C18.1245 32.406 20.3155 33.5342 22.6963 33.9851C25.0771 34.4361 27.5413 34.1897 29.779 33.2771C32.0167 32.3645 33.9279 30.8264 35.2721 28.8562C36.6164 26.886 37.3336 24.5718 37.3337 22.2048C37.3131 19.0025 35.99 15.9392 33.6556 13.6889C31.3211 11.4386 28.1665 10.1855 24.8855 10.2053Z"
            fill="#00EDBE"
          />
          <path
            d="M29.8056 17.7674C29.7723 17.1674 29.9223 16.5712 30.2365 16.0544H20.2019C20.112 16.0541 20.0229 16.0711 19.9397 16.1044C19.8565 16.1377 19.7808 16.1867 19.717 16.2485C19.6531 16.3104 19.6024 16.3839 19.5677 16.4648C19.533 16.5458 19.515 16.6327 19.5146 16.7204V18.814C19.515 18.9017 19.533 18.9886 19.5677 19.0696C19.6024 19.1505 19.6531 19.224 19.717 19.2859C19.7808 19.3477 19.8565 19.3967 19.9397 19.43C20.0229 19.4633 20.112 19.4803 20.2019 19.4799H30.2365C29.9223 18.9632 29.7723 18.3674 29.8056 17.7674Z"
            fill="#141BEB"
          />
          <path
            d="M17.9501 22.2379C17.9828 22.8379 17.8323 23.4339 17.5176 23.9504H27.5521C27.6421 23.9507 27.7312 23.9338 27.8144 23.9005C27.8976 23.8672 27.9733 23.8182 28.0371 23.7563C28.1009 23.6945 28.1516 23.621 28.1863 23.54C28.2211 23.459 28.2391 23.3722 28.2394 23.2844V21.1909C28.2391 21.1031 28.2211 21.0163 28.1863 20.9353C28.1516 20.8543 28.1009 20.7808 28.0371 20.719C27.9733 20.6571 27.8976 20.6082 27.8144 20.5749C27.7312 20.5416 27.6421 20.5246 27.5521 20.5249H17.5176C17.8318 21.0417 17.9818 21.6378 17.9485 22.2379"
            fill="#141BEB"
          />
          <path
            d="M29.8056 26.7086C29.7723 26.1085 29.9223 25.5124 30.2365 24.9956H20.2019C20.112 24.9953 20.0229 25.0123 19.9397 25.0456C19.8565 25.0789 19.7808 25.1278 19.717 25.1897C19.6531 25.2515 19.6024 25.325 19.5677 25.406C19.533 25.487 19.515 25.5738 19.5146 25.6616V27.7551C19.515 27.8429 19.533 27.9297 19.5677 28.0107C19.6024 28.0917 19.6531 28.1652 19.717 28.227C19.7808 28.2889 19.8565 28.3379 19.9397 28.3712C20.0229 28.4045 20.112 28.4214 20.2019 28.4211H30.2365C29.9223 27.9044 29.7723 27.3082 29.8056 26.7082"
            fill="#141BEB"
          />
        </svg>
        <span className="font-medium">{children}</span>
      </div>
    </button>
  );
};

export default OCButton;
