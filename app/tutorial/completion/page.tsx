"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { issueCredential } from "@/lib/oca";
import { hasClaimedCredential } from "@/utils/credentialStorage";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

export default function CompletionPage() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [claimStatus, setClaimStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  
  // Get OCID and wallet address
  const ocId = ocAuth?.getAuthState()?.OCId || "";
  const walletAddress = ocAuth?.getAuthState()?.ethAddress || "";
  
  // Check if already claimed when component loads
  const alreadyClaimed = ocId ? hasClaimedCredential(ocId, "tutorial") : false;
  if (alreadyClaimed && claimStatus === "idle") {
    setClaimStatus("success");
  }
  
  const handleClaimAchievement = async () => {
    // If already claimed, just show success
    if (alreadyClaimed) {
      setClaimStatus("success");
      return;
    }
    
    setClaimStatus("loading");
    try {
      let userInfo: DecodedToken | null = null;
      
      if (authState.idToken) {
        userInfo = jwtDecode<DecodedToken>(authState.idToken);
      }
      
      if (!userInfo || !ocId) {
        throw new Error("Unable to get user information. Please reconnect your OCID.");
      }
      
      console.log('Starting credential issuance for tutorial completion:', ocId);
   
      const result = await issueCredential(
        ocId,
        userInfo.user_id.toString(), 
        `${ocId}@example.com` 
      );
      
      console.log('Credential issuance result:', result);
      
      // Check for already issued errors
      if (result.alreadyIssued) {
        setClaimStatus("success");
        return;
      }
      
      if (!result.success) {
        throw new Error(result.message || "Failed to issue credential");
      }
      
      setClaimStatus("success");
    } catch (error) {
      console.error("Error claiming achievement:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setClaimStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Congratulations on Completing the Tutorial!
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          What You've Learned
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
          <li>How to integrate OCID Connect into a web application</li>
          <li>How to implement user authentication with OCID</li>
          <li>How to issue verifiable credentials through the OCA API</li>
          <li>Best practices for Web3 dApp development</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Claim Your Achievement
        </h2>
        
        {!isInitialized || !authState.isAuthenticated ? (
          <div>
            <p className="text-gray-700 mb-4">
              Log in with your OCID to claim a verifiable credential for completing this tutorial.
            </p>
            <LoginButton />
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              {claimStatus !== "success" 
                ? "Claim your verifiable credential for completing the tutorial."
                : "You've claimed your credential for completing this tutorial."}
            </p>
              
            {claimStatus === "idle" && (
              <Button 
                onClick={handleClaimAchievement} 
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Claim Achievement
              </Button>
            )}
              
            {claimStatus === "loading" && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-t-teal-600 border-r-teal-600 border-b-transparent border-l-transparent animate-spin"></div>
                <span className="text-teal-700">Processing...</span>
              </div>
            )}
              
            {claimStatus === "success" && (
              <div className="text-teal-700">
                <p className="font-semibold mb-2">🎉 Achievement Claimed!</p>
                <p className="mb-2">Your credential has been successfully issued.</p>
                <div className="mt-4 p-4 bg-teal-100 rounded-lg">
                  <p className="font-semibold">View Your Credential</p>
                  <p className="text-sm mt-1">
                    Check your <a 
                      href={`https://id.sandbox.opencampus.xyz/public/credentials?username=${ocId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline font-medium"
                    >
                      OCID profile
                    </a> to view your new credential.
                  </p>
                </div>
              </div>
            )}
              
            {claimStatus === "error" && (
              <div className="text-red-600">
                <p className="mb-2">There was an error claiming your achievement:</p>
                <p className="text-sm bg-red-50 p-2 rounded mb-3">{errorMessage}</p>
                <Button 
                  onClick={handleClaimAchievement}
                  className="bg-teal-600 hover:bg-teal-700 text-white mt-2"
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
        
      <div className="flex justify-between items-center mt-8">
        <Link href="/tutorial/smart-contract">
          <Button variant="outline">
            ← Back to Tutorial
          </Button>
        </Link>
        
        <Link href="/">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 