"use client";

import TutorialNavigation from "@/components/TutorialNavigation";
import PageSection from "@/components/PageSection";
import ContentCard from "@/components/ContentCard";
import CheckItem from "@/components/CheckItem";
import InfoAlert from "@/components/InfoAlert";
import FeatureList from "@/components/FeatureList";

export default function OCAIntroduction() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Introduction to Open Campus Achievements
      </h1>

      <div className="prose max-w-none">
        <PageSection title="What are Open Campus Achievements (OCA)?">
          <p className="text-gray-700 mb-4">
            Open Campus Achievements (OCA) are digital, verifiable credentials
            that adhere to the
            <a
              href="https://www.imsglobal.org/spec/ob/v3p0"
              className="text-teal-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Open Badges{" "}
            </a>
            standard. They allow organizations to issue, manage, and display
            achievements and certifications on the Open Campus ID platform.
          </p>

          <p className="text-gray-700 mb-4">
            These achievements are encrypted and stored on decentralized storage
            (via Terminal3) and also as NFTs on the blockchain. This ensures
            transparency, security, and immutability of the credentials.
          </p>

          <ContentCard variant="highlighted" className="my-8">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Key Features of OCA
            </h3>
            <div className="space-y-2">
              <CheckItem title="Verifiable">
                Cryptographically secured via blockchain
              </CheckItem>
              <CheckItem title="Portable">
                Can be displayed across platforms
              </CheckItem>
              <CheckItem title="Standardized">
                Follows Open Badges v3.0 standard
              </CheckItem>
              <CheckItem title="Decentralized">
                Stored both on IPFS and blockchain
              </CheckItem>
            </div>
          </ContentCard>
        </PageSection>

        <PageSection title="High-Level Architecture of OCA">
          <p className="text-gray-700 mb-4">
            The OCA system consists of several components working together:
          </p>

          <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
            <li>
              <strong>OC ID Connect:</strong> Enables users to authenticate and
              share their OC ID handles
            </li>
            <li>
              <strong>Achievements Issuance API:</strong> Allows organizations
              to issue verifiable credentials
            </li>
            <li>
              <strong>OC ID Dashboard:</strong> Where users manage and display
              their achievements
            </li>
            <li>
              <strong>Blockchain Storage:</strong> Provides immutable record of
              achievements
            </li>
          </ol>

          <InfoAlert
            variant="warning"
            title="Note"
            className="my-6"
            borderLeft={true}
          >
            To issue OCAs, you'll need an OC ID (as the issuer) and an API key
            from Open Campus. Contact your Open Campus Ambassador to obtain
            these credentials.
          </InfoAlert>
        </PageSection>

        <PageSection title="Benefits of Integrating OCA">
          <FeatureList
            features={[
              {
                title: "For Organizations",
                items: [
                  "Issue verifiable digital credentials",
                  "Reduce certificate fraud",
                  "Integrate with existing systems",
                  "Enhance value of educational offerings",
                ],
              },
              {
                title: "For Learners",
                items: [
                  "Own and control their credentials",
                  "Share achievements securely",
                  "Build a verifiable learning profile",
                  "Eliminate need for credential verification",
                ],
              },
            ]}
          />
        </PageSection>

        <PageSection title="Getting Started with OCA">
          <p className="text-gray-700 mb-4">
            To integrate OCA into your application, you'll need:
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>An OC ID for your organization (used as the issuer ID)</li>
            <li>Implementation of OC ID Connect for your users</li>
            <li>An API key for production access</li>
          </ul>

          <p className="text-gray-700 mb-4">
            In the next sections, we'll explore how to use the OCA API to issue
            and verify credentials.
          </p>
        </PageSection>
      </div>

      <TutorialNavigation />
    </div>
  );
}
