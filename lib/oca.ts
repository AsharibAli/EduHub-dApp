/**
 * This file contains utilities for the Open Campus Achievements (OCA) and Open Campus Badges (OCB) APIs
 *
 * Note: In a production app, these API calls should be made from your backend
 * to protect your API key. We now use a Next.js API route to handle this securely.
 *
 * Important: OCB badges are now only issued to EOA wallets for Yuzu Season 3 eligibility.
 * OCID wallet issuance has been removed per Open Campus support team guidance.
 */

import {
  hasClaimedCredential,
  storeClaimedCredential,
} from "@/utils/credentialStorage";

/**
 * Issues an OCA credential to a user
 *
 * @param holderOcId The OCID of the credential recipient
 * @param userName The name of the recipient
 * @param userEmail The email of the recipient
 * @returns Response from the OCA API
 */
export async function issueCredential(
  holderOcId: string,
  userName: string,
  userEmail: string
) {
  try {
    console.log("Attempting to issue OC Ecosystem credential for:", holderOcId);

    // Check if user already claimed this credential
    const credentialType = "tutorial";
    const alreadyClaimed = hasClaimedCredential(holderOcId, credentialType);

    if (alreadyClaimed) {
      console.log("User already claimed this credential");
      return {
        success: false,
        message: "You have already claimed this credential",
        alreadyIssued: true,
      };
    }

    // Call our local API route instead of the OCA API directly
    const response = await fetch("/api/issue-credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentialType,
        holderOcId,
        userName,
        userEmail,
        alreadyClaimed,
      }),
    });

    if (!response.ok) {
      let errorMessage = "OCA API error";
      try {
        const errorData = await response.json();

        // If this is a duplicate credential, inform the user nicely
        if (errorData.alreadyIssued) {
          console.log("Credential already issued (server reported)");
          return {
            success: false,
            message: "You have already claimed this credential",
            alreadyIssued: true,
          };
        }

        errorMessage =
          errorData.error ||
          errorData.message ||
          `HTTP error ${response.status}`;
        console.error("Full error response:", errorData);
      } catch (e) {
        errorMessage = `HTTP error ${
          response.status
        }: ${await response.text()}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Credential issued successfully:", data);

    // Store the credential claim in localStorage
    if (data.success && data.claimRecord) {
      storeClaimedCredential(data.claimRecord);
    }

    return data;
  } catch (error) {
    console.error("Error issuing credential:", error);
    throw error;
  }
}

/**
 * Verifies an OCA credential
 *
 * Note: This is a stub - in a real implementation, you would verify
 * the credential with the OCA verification endpoint
 */
export async function verifyCredential(credentialId: string) {
  try {
    // In a real implementation, you would call the verification endpoint
    // This is just a placeholder
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      verified: true,
      issuer: "Open Campus",
      issuanceDate: new Date().toISOString(),
      credentialType: "Certificate",
    };
  } catch (error) {
    console.error("Error verifying credential:", error);
    throw error;
  }
}

/**
 * Issues a bootcamp completion credential to a user
 *
 * @param holderOcId The OCID of the credential recipient
 * @param userName The name of the recipient
 * @param userEmail The email of the recipient
 * @returns Response from the OCA API
 */
export async function issueBootcampCredential(
  holderOcId: string,
  userName: string,
  userEmail: string
) {
  try {
    console.log("Attempting to issue bootcamp credential for:", holderOcId);

    // Check if user already claimed this credential
    const credentialType = "bootcamp";
    const alreadyClaimed = hasClaimedCredential(holderOcId, credentialType);

    if (alreadyClaimed) {
      console.log("User already claimed this credential");
      return {
        success: false,
        message: "You have already claimed this credential",
        alreadyIssued: true,
      };
    }

    // Call our local API route instead of the OCA API directly
    const response = await fetch("/api/issue-credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentialType,
        holderOcId,
        userName,
        userEmail,
        alreadyClaimed,
      }),
    });

    if (!response.ok) {
      let errorMessage = "OCA API error";
      try {
        const errorData = await response.json();

        // If this is a duplicate credential, inform the user nicely
        if (errorData.alreadyIssued) {
          console.log("Credential already issued (server reported)");
          return {
            success: false,
            message: "You have already claimed this credential",
            alreadyIssued: true,
          };
        }

        errorMessage =
          errorData.error ||
          errorData.message ||
          `HTTP error ${response.status}`;
        console.error("Full error response:", errorData);
      } catch (e) {
        errorMessage = `HTTP error ${
          response.status
        }: ${await response.text()}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Bootcamp credential issued successfully:", data);

    // Store the credential claim in localStorage
    if (data.success && data.claimRecord) {
      storeClaimedCredential(data.claimRecord);
    }

    return data;
  } catch (error) {
    console.error("Error issuing bootcamp credential:", error);
    // Detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}

/**
 * Issues an OCB (Open Campus Badge) to a wallet address
 * This is required for Yuzu Season 3 points eligibility
 *
 * @param holderAddress The wallet address of the badge recipient
 * @param userName The name of the recipient (optional for wallet issuance)
 * @param userEmail The email of the recipient (optional for wallet issuance)
 * @param badgeType The type of badge to issue (e.g., 'eduplus')
 * @returns Response from the OCB API
 */
export async function issueBadgeToWallet(
  holderAddress: string,
  userName: string = "EduHub User",
  userEmail: string = "user@eduhub.dev",
  badgeType: string = "eduplus"
) {
  try {
    console.log(
      "Attempting to issue OCB to wallet:",
      holderAddress,
      "Badge type:",
      badgeType
    );

    // Check if wallet already claimed this badge
    const alreadyClaimed = hasClaimedCredential(holderAddress, badgeType);

    if (alreadyClaimed) {
      console.log("Wallet already claimed this badge");
      return {
        success: false,
        message: "This wallet has already claimed this badge",
        alreadyIssued: true,
      };
    }

    // Call our local API route for OCB issuance to wallet
    const response = await fetch("/api/issue-credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentialType: badgeType,
        holderAddress,
        userName,
        userEmail,
        alreadyClaimed,
        isOCB: true,
      }),
    });

    if (!response.ok) {
      let errorMessage = "OCB API error";
      try {
        const errorData = await response.json();

        // If this is a duplicate badge, inform the user nicely
        if (errorData.alreadyIssued) {
          console.log("Badge already issued to wallet (server reported)");
          return {
            success: false,
            message: "This wallet has already claimed this badge",
            alreadyIssued: true,
          };
        }

        errorMessage =
          errorData.error ||
          errorData.message ||
          `HTTP error ${response.status}`;
        console.error("Full error response:", errorData);
      } catch (e) {
        errorMessage = `HTTP error ${
          response.status
        }: ${await response.text()}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Badge issued successfully to wallet:", data);
    console.log("🎉 BADGE ISSUED TO WALLET:", {
      walletAddress: holderAddress,
      badgeType: badgeType,
      yuzu_eligible: true,
      note: "Badge is stored in Open Campus credential system, not in MetaMask",
      api_response: data,
    });

    // Store the badge claim in localStorage using wallet address as key
    if (data.success && data.claimRecord) {
      storeClaimedCredential(data.claimRecord);
    }

    return data;
  } catch (error) {
    console.error("Error issuing badge to wallet:", error);
    throw error;
  }
}
