import React, { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { issueBadgeToOCID, issueBadgeToWallet } from "@/lib/oca";
import LoadingSpinner from "./LoadingSpinner";
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

type BadgeClaimerProps = {
  badgeType: string;
  title?: string;
  description?: string;
  className?: string;
  issueToWallet?: boolean; // If true, issues to wallet for Yuzu eligibility
  showBothOptions?: boolean; // If true, shows both OCID and wallet options
};

const BadgeClaimer: React.FC<BadgeClaimerProps> = ({
  badgeType,
  title = "Claim Your Badge",
  description = "You can now claim your Open Campus Badge. This verifiable badge will be added to your profile.",
  className = "",
  issueToWallet = false,
  showBothOptions = false,
}) => {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [claimStatus, setClaimStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [claimMethod, setClaimMethod] = useState<"ocid" | "wallet">(
    issueToWallet ? "wallet" : "ocid"
  );

  // Get OCID and wallet address
  const ocId = ocAuth?.getAuthState()?.OCId || "";
  const walletAddress = ocAuth?.getAuthState()?.ethAddress || "";

  // Check if already claimed when component loads
  const identifier = claimMethod === "wallet" ? walletAddress : ocId;
  const alreadyClaimed = identifier
    ? hasClaimedCredential(identifier, badgeType)
    : false;

  if (alreadyClaimed && claimStatus === "idle") {
    setClaimStatus("success");
  }

  const handleClaimBadge = async () => {
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

      if (!userInfo) {
        throw new Error(
          "Unable to get user information. Please reconnect your OCID."
        );
      }

      if (claimMethod === "wallet" && !walletAddress) {
        throw new Error(
          "Wallet address not found. Please ensure your wallet is connected."
        );
      }

      if (claimMethod === "ocid" && !ocId) {
        throw new Error("OCID not found. Please ensure you are logged in.");
      }

      console.log(
        `Starting badge issuance to ${claimMethod}:`,
        claimMethod === "wallet" ? walletAddress : ocId
      );

      let result;
      if (claimMethod === "wallet") {
        result = await issueBadgeToWallet(
          walletAddress,
          userInfo.user_id.toString(),
          `${ocId}@example.com`,
          badgeType
        );
      } else {
        result = await issueBadgeToOCID(
          ocId,
          userInfo.user_id.toString(),
          `${ocId}@example.com`,
          badgeType
        );
      }

      console.log("Badge issuance result:", result);

      // Check for already issued errors
      if (result.alreadyIssued) {
        setClaimStatus("success");
        return;
      }

      if (!result.success) {
        throw new Error(result.message || "Failed to issue badge");
      }

      setClaimStatus("success");
    } catch (error) {
      console.error("Error claiming badge:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setClaimStatus("error");
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-md ${className}`}>
      <h3 className="text-xl font-semibold text-teal-700 mb-4">{title}</h3>

      {!isInitialized || !authState?.isAuthenticated ? (
        <div>
          <p className="text-gray-700 mb-4">
            Connect your OCID to claim your badge.
          </p>
          <LoginButton />
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">
            {claimStatus !== "success"
              ? description
              : "You've successfully claimed your badge!"}
          </p>

          {/* Claim method selection */}
          {showBothOptions && claimStatus === "idle" && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Choose how to claim your badge:
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setClaimMethod("ocid")}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    claimMethod === "ocid"
                      ? "bg-teal-100 border-teal-300 text-teal-700"
                      : "bg-gray-50 border-gray-300 text-gray-700"
                  }`}
                >
                  To OCID Profile
                </button>
                <button
                  onClick={() => setClaimMethod("wallet")}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    claimMethod === "wallet"
                      ? "bg-teal-100 border-teal-300 text-teal-700"
                      : "bg-gray-50 border-gray-300 text-gray-700"
                  }`}
                >
                  To Wallet (Yuzu Eligible)
                </button>
              </div>
              {claimMethod === "wallet" && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Badges issued to wallets are eligible for Yuzu Season 3
                  points
                </p>
              )}
            </div>
          )}

          {claimStatus === "idle" && (
            <Button
              onClick={handleClaimBadge}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Claim Badge{claimMethod === "wallet" ? " to Wallet" : " to OCID"}
            </Button>
          )}

          {claimStatus === "loading" && <LoadingSpinner text="Processing..." />}

          {claimStatus === "success" && (
            <div className="text-teal-700">
              <p className="font-semibold mb-2">🎉 Badge Claimed!</p>
              <p className="mb-2">
                Your badge has been successfully issued
                {claimMethod === "wallet" ? " to your wallet" : " to your OCID"}
                .
              </p>
              {claimMethod === "wallet" && (
                <p className="text-sm text-amber-600 mb-2">
                  🎁 This badge is eligible for Yuzu Season 3 points!
                </p>
              )}
              <div className="mt-4 p-4 bg-teal-100 rounded-lg">
                <p className="font-semibold">View Your Badge</p>
                 {claimMethod === "ocid" ? (
                   <p className="text-sm mt-1">
                     Check your{" "}
                     <a
                       href={`${process.env.NODE_ENV === 'production' 
                         ? 'https://id.opencampus.xyz' 
                         : 'https://id.sandbox.opencampus.xyz'}/public/credentials?username=${ocId}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-teal-600 hover:underline font-medium"
                     >
                       OCID profile
                     </a>{" "}
                     to view your new badge.
                   </p>
                ) : (
                  <div className="text-sm mt-1">
                    <p className="mb-2">
                      Your badge has been issued to wallet:{" "}
                      <code className="bg-white px-2 py-1 rounded text-xs">
                        {walletAddress?.substring(0, 6)}...
                        {walletAddress?.substring(walletAddress.length - 4)}
                      </code>
                    </p>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="font-medium text-blue-700 mb-1">
                        📋 How to find your badge:
                      </p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>
                          • Badge is stored in Open Campus credential system
                        </li>
                        <li>
                          • Not visible in MetaMask (it's a verifiable
                          credential, not a token)
                        </li>
                        <li>
                          • Will be automatically counted for Yuzu Season 3
                          points
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {claimStatus === "error" && (
            <div className="text-red-600">
              <p className="mb-2">There was an error claiming your badge:</p>
              <p className="text-sm bg-red-50 p-2 rounded mb-3">
                {errorMessage}
              </p>
              <Button
                onClick={handleClaimBadge}
                className="bg-teal-600 hover:bg-teal-700 text-white mt-2"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BadgeClaimer;
