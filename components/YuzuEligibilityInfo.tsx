import React from "react";
import InfoAlert from "@/components/InfoAlert";
import Link from "next/link";

const YuzuEligibilityInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      <InfoAlert>
        <div className="space-y-3">
          <h4 className="font-semibold text-teal-700">
            🍊 Yuzu Season 3 Badge Requirements
          </h4>
          <p className="text-sm text-gray-700">
            To be eligible for Yuzu Season 3 points, your Open Campus Badge must
            be issued to an EOA (Externally Owned Account) wallet like MetaMask.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Badge Requirements:
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>
                • Complete the required learning modules (Workshop & Tutorial)
              </li>
              <li>• Connect your OCID to verify your progress</li>
              <li>• Connect your MetaMask wallet to receive the badge</li>
              <li>• Badge will be issued directly to your wallet address</li>
              <li>
                • View your badges on the{" "}
                <a
                  href="https://dashboard.educhain.xyz/badges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  Yuzu Badges Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div className="text-xs text-gray-600">
            <p className="mb-1">
              <strong>Why this change?</strong>
            </p>
            <p>
              This ensures that all Yuzu-eligible badges are held by wallets
              that can interact with the full Web3 ecosystem and claim rewards
              directly.
            </p>
          </div>
        </div>
      </InfoAlert>
    </div>
  );
};

export default YuzuEligibilityInfo;
