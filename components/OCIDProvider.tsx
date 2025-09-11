"use client";

import { FC, ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";

interface OCIDProviderProps {
  children: ReactNode;
}

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV !== "production";

const opts = {
  clientId: process.env.NEXT_PUBLIC_OCID_CLIENT_ID,
  redirectUri: isDevelopment
    ? "http://localhost:3000/redirect"
    : "https://app.eduhub.dev/redirect",
  referralCode: "PARTNER6",
};

const OCIDProvider: FC<OCIDProviderProps> = ({ children }) => {
  // Check if required environment variables are set
  if (!process.env.NEXT_PUBLIC_OCID_CLIENT_ID) {
    console.error('NEXT_PUBLIC_OCID_CLIENT_ID environment variable is not set');
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">
          <strong>Configuration Error:</strong> OCID Client ID is not configured. 
          Please set the NEXT_PUBLIC_OCID_CLIENT_ID environment variable.
        </p>
      </div>
    );
  }

  return (
    <OCConnect opts={opts} sandboxMode={isDevelopment}>
      {children}
    </OCConnect>
  );
};

export default OCIDProvider;
