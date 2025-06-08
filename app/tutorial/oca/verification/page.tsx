"use client";

import TutorialNavigation from "@/components/TutorialNavigation";
import PageSection from "@/components/PageSection";
import ContentCard from "@/components/ContentCard";
import CheckItem from "@/components/CheckItem";
import InfoAlert from "@/components/InfoAlert";

export default function OCAVerification() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Verifying Open Campus Achievements
      </h1>

      <div className="prose max-w-none">
        <PageSection title="Understanding Credential Verification">
          <p className="text-gray-700 mb-4">
            Verification is a crucial aspect of Open Campus Achievements. It
            ensures that credentials are:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>
              <strong>Authentic</strong> - Issued by the claimed issuer
            </li>
            <li>
              <strong>Unaltered</strong> - Content has not been modified since
              issuance
            </li>
            <li>
              <strong>Valid</strong> - Not expired or revoked
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            OCAs use cryptographic proofs and blockchain technology to enable
            secure verification. This provides a higher level of trust compared
            to traditional credentials that can be easily forged.
          </p>
        </PageSection>

        <PageSection title="Verification Methods">
          <div className="space-y-6">
            <ContentCard title="1. OC ID Dashboard">
              <p className="text-gray-700 mb-2">
                The simplest way to verify an achievement is through the Open
                Campus ID Dashboard. Anyone can view a user's public profile to
                see their verified credentials.
              </p>
              <p className="text-gray-700 mb-2">Public profile URL format:</p>
              <pre className="bg-gray-100 p-2 rounded text-sm">
                https://id.opencampus.xyz/profile/credentials?username=&lt;OC_ID&gt;
              </pre>
            </ContentCard>

            <ContentCard title="2. Blockchain Verification">
              <p className="text-gray-700 mb-2">
                OCAs are stored as NFTs on the EDU Chain, providing an immutable
                record. You can verify a credential's existence and metadata by
                checking the blockchain directly.
              </p>
              <p className="text-gray-700 mb-2">
                Use the EDU Chain Explorer to check the NFT associated with a
                credential:
              </p>
              <pre className="bg-gray-100 p-2 rounded text-sm">
                https://explorer.educhain.dev/nft/&lt;CONTRACT_ADDRESS&gt;/&lt;TOKEN_ID&gt;
              </pre>
            </ContentCard>

            <ContentCard title="3. Programmatic Verification">
              <p className="text-gray-700 mb-2">
                For applications that need to verify credentials
                programmatically, you can use the verification API or implement
                your own verification logic using the credential's digital
                signature.
              </p>
            </ContentCard>
          </div>
        </PageSection>

        <PageSection title="Implementing Verifiable Presentation (VP)">
          <p className="text-gray-700 mb-4">
            A Verifiable Presentation (VP) allows a credential holder to present
            a proof of their credential to a verifier in a secure,
            privacy-preserving way. The holder can choose which credentials or
            claims to share.
          </p>

          <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
            <pre>{`// Example of building a Verifiable Presentation
async function createVerifiablePresentation(credential, recipientDid) {
  // In a real implementation, you would:
  // 1. Select the specific credential(s) to include
  // 2. Create a VP structure that includes the credential
  // 3. Sign the VP with the holder's private key
  // 4. Send the VP to the verifier
  
  const verifiablePresentation = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiablePresentation"],
    "verifiableCredential": [credential],
    "holder": holderDid,
    // Additional claims or disclosures
  };
  
  // Sign the presentation
  // const signedVP = await signPresentation(verifiablePresentation);
  
  return verifiablePresentation;
}`}</pre>
          </div>
        </PageSection>

        <PageSection title="Credential Revocation">
          <p className="text-gray-700 mb-4">
            In some cases, issuers may need to revoke credentials that were
            incorrectly issued or are no longer valid. The OCA system supports
            credential revocation through the Open Campus API.
          </p>

          <ContentCard title="Revocation Process">
            <p className="text-gray-700 mb-2">
              Only the original issuer can revoke a credential. The process
              involves:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Identifying the specific credential by its ID</li>
              <li>Calling the revocation API with proper authorization</li>
              <li>Updating the revocation status on the blockchain</li>
            </ol>
            <p className="text-gray-700 mt-3">
              Once revoked, the credential will be marked as invalid in the Open
              Campus ID Dashboard and through verification APIs.
            </p>
          </ContentCard>

          <InfoAlert
            variant="warning"
            title="Important"
            className="my-6"
            borderLeft={true}
          >
            Revocation should be used judiciously. Since credentials are stored
            on the blockchain, revocation doesn't delete the credential but
            marks it as invalid.
          </InfoAlert>
        </PageSection>

        <PageSection title="Building a Verification UI">
          <p className="text-gray-700 mb-4">
            If you want to implement credential verification in your
            application, consider creating a user-friendly verification UI.
            Here's an example approach:
          </p>

          <ContentCard>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li>
                <strong>Input Method:</strong> Allow users to submit a
                credential for verification by:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Entering a credential ID</li>
                  <li>Uploading a JSON credential file</li>
                  <li>Scanning a QR code</li>
                </ul>
              </li>
              <li>
                <strong>Verification Process:</strong> Show a clear indication
                that verification is in progress
              </li>
              <li>
                <strong>Results Display:</strong> Present verification results
                with:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Clear success/failure indication</li>
                  <li>Issuer information</li>
                  <li>Issuance and expiration dates</li>
                  <li>Achievement details</li>
                </ul>
              </li>
            </ol>
          </ContentCard>

          <InfoAlert
            variant="info"
            title="Best Practice"
            className="my-6"
            borderLeft={true}
          >
            Always check the credential status (valid, expired, revoked) as part
            of your verification process. Display this status prominently to
            users.
          </InfoAlert>
        </PageSection>

        <PageSection title="Privacy Considerations">
          <p className="text-gray-700 mb-4">
            When implementing verification solutions, consider these privacy
            aspects:
          </p>

          <div className="space-y-3 mb-6">
            <CheckItem title="Consent">
              Always get user consent before verifying their credentials
            </CheckItem>

            <CheckItem title="Selective Disclosure">
              Support sharing only necessary credential information
            </CheckItem>

            <CheckItem title="Data Minimization">
              Only collect and store verification data that's necessary
            </CheckItem>

            <CheckItem title="Transparency">
              Clearly communicate how verification data will be used
            </CheckItem>
          </div>
        </PageSection>
      </div>

      <TutorialNavigation />
    </div>
  );
}
