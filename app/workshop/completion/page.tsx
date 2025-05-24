"use client";

import React from "react";
import WorkshopProgress from "@/components/WorkshopProgress";
import PageSection from "@/components/PageSection";
import ContentCard from "@/components/ContentCard";
import NavigationButtons from "@/components/NavigationButtons";
import CredentialClaimer from "@/components/CredentialClaimer";

export default function Completion() {
  return (
    <div className="space-y-8">
      {/* Workshop Progress */}
      <WorkshopProgress />

      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Bootcamp Completed!
      </h1>

      <ContentCard variant="highlighted" className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6">
          Congratulations on Completing the Web3 Developer Bootcamp!
        </h2>

        <p className="text-gray-700 mb-6">
          You&apos;ve successfully finished all three days of our intensive
          blockchain developer workshop. Now you have the knowledge and skills
          to build your own decentralized applications.
        </p>

        <PageSection title="What You've Learned:">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Setting up a complete Web3 development environment</li>
            <li>Writing, testing and deploying smart contracts</li>
            <li>Building a frontend that interacts with the blockchain</li>
            <li>Working with MetaMask and other Web3 wallets</li>
            <li>Best practices for blockchain development</li>
          </ul>
        </PageSection>

        <CredentialClaimer
          credentialType="bootcamp"
          title="Claim Your Achievement"
          description="You can now claim your Web3 Developer Bootcamp credential. This verifiable credential will be added to your OCID profile."
        />
      </ContentCard>

      <NavigationButtons
        prevPath="/workshop/day-three"
        prevLabel="Back to Day Three"
        nextPath="/"
        nextLabel="Return to Home"
      />
    </div>
  );
}
