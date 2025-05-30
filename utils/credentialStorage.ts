// Credential storage utility

type CredentialClaim = {
  holderOcId: string;
  credentialType: string;
  issuedAt: number;
};

// Local storage key for storing claimed credentials
const CLAIMED_CREDENTIALS_KEY = "eduhub_claimed_credentials";

/**
 * Check if a credential has already been claimed
 * @param holderOcId The user's OC ID
 * @param credentialType The type of credential ('bootcamp' or default tutorial)
 * @returns boolean indicating if the credential was already claimed
 */
export function hasClaimedCredential(
  holderOcId: string,
  credentialType: string
): boolean {
  // Don't attempt localStorage access during SSR
  if (typeof window === "undefined") return false;

  try {
    const existingClaimsStr = localStorage.getItem("eduHub_claimedCredentials");
    if (!existingClaimsStr) return false;

    const existingClaims: CredentialClaim[] = JSON.parse(existingClaimsStr);

    return existingClaims.some(
      (claim) =>
        claim.holderOcId === holderOcId &&
        claim.credentialType === credentialType
    );
  } catch (error) {
    console.error("Error checking credential claim:", error);
    return false;
  }
}

/**
 * Store a claimed credential in localStorage
 * @param claim The claim record returned from the API
 */
export function storeClaimedCredential(claim: CredentialClaim): void {
  // Don't attempt localStorage access during SSR
  if (typeof window === "undefined") return;

  try {
    // Get existing claims or initialize empty array
    const existingClaimsStr = localStorage.getItem("eduHub_claimedCredentials");
    const existingClaims: CredentialClaim[] = existingClaimsStr
      ? JSON.parse(existingClaimsStr)
      : [];

    // Check if this credential is already claimed
    const alreadyClaimed = existingClaims.some(
      (c) =>
        c.holderOcId === claim.holderOcId &&
        c.credentialType === claim.credentialType
    );

    // If not already claimed, add it
    if (!alreadyClaimed) {
      existingClaims.push(claim);
      localStorage.setItem(
        "eduHub_claimedCredentials",
        JSON.stringify(existingClaims)
      );
    }
  } catch (error) {
    console.error("Error storing credential claim:", error);
  }
}

/**
 * Get all credentials claimed by a user
 * @param holderOcId The user's OC ID
 * @returns Array of claimed credentials
 */
export function getUserClaimedCredentials(
  holderOcId: string
): CredentialClaim[] {
  // Don't attempt localStorage access during SSR
  if (typeof window === "undefined") return [];

  try {
    const existingClaimsStr = localStorage.getItem("eduHub_claimedCredentials");
    if (!existingClaimsStr) return [];

    const existingClaims: CredentialClaim[] = JSON.parse(existingClaimsStr);

    return existingClaims.filter((claim) => claim.holderOcId === holderOcId);
  } catch (error) {
    console.error("Error retrieving user credential claims:", error);
    return [];
  }
}

/**
 * Clear all stored credential claims (useful for debugging or testing)
 */
export function clearClaimedCredentials(): void {
  // Don't attempt localStorage access during SSR
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CLAIMED_CREDENTIALS_KEY);
  } catch (error) {
    console.error("Error clearing claimed credentials:", error);
  }
}
