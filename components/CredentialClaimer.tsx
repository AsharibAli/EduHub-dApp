import React, { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";
import { issueBootcampCredential, issueCredential } from "@/lib/oca";
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

type CredentialClaimerProps = {
  credentialType: "bootcamp" | "tutorial";
  title?: string;
  description?: string;
  className?: string;
};

const CredentialClaimer: React.FC<CredentialClaimerProps> = ({
  credentialType,
  title = "Claim Your Achievement",
  description = "You can now claim your credential. This verifiable credential will be added to your OCID profile.",
  className = "",
}) => {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [claimStatus, setClaimStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  // Get OCID and wallet address
  const ocId = ocAuth?.getAuthState()?.OCId || "";

  // Check if already claimed when component loads
  const alreadyClaimed = ocId
    ? hasClaimedCredential(ocId, credentialType)
    : false;
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
        throw new Error(
          "Unable to get user information. Please reconnect your OCID."
        );
      }

      console.log("Starting credential issuance for user:", ocId);

      const issueFunction =
        credentialType === "bootcamp"
          ? issueBootcampCredential
          : issueCredential;

      const result = await issueFunction(
        ocId,
        userInfo.user_id.toString(),
        `${ocId}@example.com`
      );

      console.log("Credential issuance result:", result);

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
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setClaimStatus("error");
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-md ${className}`}>
      <h3 className="text-xl font-semibold text-teal-700 mb-4">{title}</h3>

      {!isInitialized || !authState.isAuthenticated ? (
        <div>
          <p className="text-gray-700 mb-4">
            Connect your OCID to claim your credential.
          </p>
          <LoginButton />
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">
            {claimStatus !== "success"
              ? description
              : "You've successfully claimed your credential."}
          </p>

          {claimStatus === "idle" && (
            <Button
              onClick={handleClaimAchievement}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Claim Achievement
            </Button>
          )}

          {claimStatus === "loading" && <LoadingSpinner text="Processing..." />}

          {claimStatus === "success" && (
            <div className="text-teal-700">
              <p className="font-semibold mb-2">🎉 Achievement Claimed!</p>
              <p className="mb-2">
                Your credential has been successfully issued.
              </p>
              <div className="mt-4 p-4 bg-teal-100 rounded-lg">
                <p className="font-semibold">View Your Credential</p>
                <p className="text-sm mt-1">
                  Check your{" "}
                  <a
                    href={`https://id.sandbox.opencampus.xyz/public/credentials?username=${ocId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline font-medium"
                  >
                    OCID profile
                  </a>{" "}
                  to view your new credential.
                </p>
              </div>
            </div>
          )}

          {claimStatus === "error" && (
            <div className="text-red-600">
              <p className="mb-2">
                There was an error claiming your achievement:
              </p>
              <p className="text-sm bg-red-50 p-2 rounded mb-3">
                {errorMessage}
              </p>
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
  );
};

export default CredentialClaimer;
