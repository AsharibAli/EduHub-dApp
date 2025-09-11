"use client";
import React, { useState, useEffect } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { DirectMetaMaskConnect } from "@/components/DirectMetaMaskConnect";
import { issueBadgeToWallet } from "@/lib/oca";
import LoadingSpinner from "./LoadingSpinner";
import { hasClaimedCredential } from "@/utils/credentialStorage";
import Link from "next/link";

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

type EOABadgeClaimerProps = {
  badgeType: string;
  title?: string;
  description?: string;
  className?: string;
};

const EOABadgeClaimer: React.FC<EOABadgeClaimerProps> = ({
  badgeType,
  title = "Claim Your Badge",
  description = "Connect your wallet to claim your Open Campus Badge for Yuzu Season 3 eligibility.",
  className = "",
}) => {
  const { isInitialized, authState } = useOCAuth();
  const [claimStatus, setClaimStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Check if already claimed when wallet address changes
  useEffect(() => {
    if (walletAddress && claimStatus === "idle") {
      const alreadyClaimed = hasClaimedCredential(walletAddress, badgeType);
      if (alreadyClaimed) {
        setClaimStatus("success");
      }
    }
  }, [walletAddress, badgeType, claimStatus]);

  const getUserName = () => {
    try {
      if (authState?.idToken) {
        const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
        return decodedToken.edu_username;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return "";
  };

  const handleWalletConnect = (address: string) => {
    console.log("Wallet connected:", address);
    setWalletAddress(address);
    setIsWalletConnected(true);
  };

  const handleWalletDisconnect = () => {
    console.log("Wallet disconnected");
    setWalletAddress("");
    setIsWalletConnected(false);
    setClaimStatus("idle");
    setErrorMessage("");
  };

  const handleClaimBadge = async () => {
    if (!walletAddress || !authState?.idToken) {
      setErrorMessage("Missing wallet address or authentication token");
      setClaimStatus("error");
      return;
    }

    setClaimStatus("loading");
    setErrorMessage("");

    try {
      // Decode JWT token to get user information
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      const userName = decodedToken.edu_username;
      const userEmail = `${userName}@opencampus.xyz`;

      console.log("User info from token:", { userName, userEmail });
      console.log("Starting badge issuance to wallet:", walletAddress);

      const result = await issueBadgeToWallet(
        walletAddress,
        userName,
        userEmail,
        badgeType
      );

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

  // Check if user is authenticated with OCID (for username only)
  if (!isInitialized || !authState?.isAuthenticated) {
    return (
      <div className={`bg-white rounded-lg p-6 shadow-md ${className}`}>
        <h3 className="text-xl font-semibold text-teal-700 mb-4">{title}</h3>
        <div className="space-y-4">
          <p className="text-gray-700">To claim your Open Campus Badge:</p>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>First, connect your OCID to verify your learning progress</li>
            <li>Then connect your wallet (MetaMask) to receive the badge</li>
            <li>
              Claim your badge directly to your wallet for Yuzu eligibility
            </li>
          </ol>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="space-y-6">
        {title && (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}

        {/* Wallet Connection Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 6h-17C2.67 6 2 6.67 2 7.5v9C2 17.33 2.67 18 3.5 18h17c.83 0 1.5-.67 1.5-1.5v-9C22 6.67 21.33 6 20.5 6zM3.5 7h17c.28 0 .5.22.5.5v1H3v-1c0-.28.22-.5.5-.5zM20.5 17h-17c-.28 0-.5-.22-.5-.5v-6h18v6c0 .28-.22.5-.5.5z" />
                <circle cx="6" cy="14" r="1" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Connect Wallet</h4>
              <p className="text-sm text-gray-600">
                Connect MetaMask to receive your badge
              </p>
            </div>
          </div>

          <DirectMetaMaskConnect
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            storageKey="yuzu-badge-wallet"
          />
        </div>

        {/* Claim Badge Button */}
        {isWalletConnected && walletAddress && (
          <div className="space-y-6">
            {claimStatus === "idle" && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl blur opacity-20 animate-pulse"></div>
                <Button
                  onClick={handleClaimBadge}
                  className="relative w-full bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 text-white py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-teal-500"
                  disabled={false}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                    </svg>
                    <span>Claim Badge to Wallet</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </Button>
              </div>
            )}

            {claimStatus === "loading" && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg
                      className="w-8 h-8 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <LoadingSpinner text="Issuing badge to your wallet..." />
                <p className="text-sm text-blue-600 mt-3 font-medium">
                  ⚡ Minting your credential on-chain...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  This process may take 30-60 seconds
                </p>
              </div>
            )}

            {claimStatus === "success" && (
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                {/* Celebration Background Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-300 to-green-400 rounded-full -ml-16 -mt-16 opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-300 to-teal-400 rounded-full -mr-12 -mb-12 opacity-20 animate-pulse delay-1000"></div>

                <div className="relative text-center mb-6">
                  <h4 className="text-3xl font-black text-green-800 mb-3">
                    Success! 🎉
                  </h4>
                  <p className="text-lg text-green-700 font-semibold">
                    Your EduPlus badge has been minted!
                  </p>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 mt-4 border border-green-200">
                    <p className="text-sm text-gray-700 font-mono">
                      Badge issued to:{" "}
                      <span className="font-bold text-green-700">
                        {walletAddress?.substring(0, 8)}...
                        {walletAddress?.substring(walletAddress.length - 6)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-green-200 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-lg">🍊</span>
                    </div>
                    <h5 className="text-xl font-bold text-gray-900">
                      Track Your Yuzu Points
                    </h5>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-800 mb-1">
                          Monitor Your Season 3 Progress
                        </p>
                        <p className="text-sm text-orange-700 mb-3">
                          Your badge is now eligible for Yuzu Season 3 points.
                          Track your progress and see all your achievements:
                        </p>
                        <a
                          href="https://dashboard.educhain.xyz/badges"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Open Yuzu Dashboard
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/">
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Back to Home</span>
                    </div>
                  </Button>
                </Link>
              </div>
            )}

            {claimStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-red-800 mb-2">
                    Error Claiming Badge
                  </h4>
                  <p className="text-red-700 text-sm mb-4">{errorMessage}</p>
                </div>
                <Button
                  onClick={handleClaimBadge}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EOABadgeClaimer;
