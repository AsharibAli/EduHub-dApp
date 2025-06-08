"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function OCIDProduction() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        OCID Connect for Production
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Moving from Sandbox to Production
        </h2>

        <p className="text-gray-700 mb-4">
          After you've tested your OCID integration in the Sandbox environment,
          you'll need to transition to the Production environment for your live
          application.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Important:</strong> The Sandbox and Production environments
            are separate. OCIDs registered in the Sandbox don't exist in
            Production and vice versa.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Prerequisites for Production
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              1. Obtain an Auth Client ID
            </h3>
            <p className="text-gray-700">
              For Production mode, an Auth Client ID is{" "}
              <strong>required</strong>. Contact your Open Campus Ambassador to
              request access to an Open Campus Developer Account and obtain an
              Auth Client ID.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              2. Configure Redirect URIs
            </h3>
            <p className="text-gray-700">
              In Production mode, you must whitelist the Redirect URIs for your
              Auth Client. Only configured Redirect URIs are allowed to be used
              with the SDK.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              3. Submit the Whitelisting Form
            </h3>
            <p className="text-gray-700">
              Complete the{" "}
              <a
                href="https://forms.gle/g5JXqaJLCFkuznb57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                App Whitelisting Form
              </a>{" "}
              to get your domain whitelisted. Provide the correct site link, as
              this will whitelist your app at the domain level.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Updating Your Code for Production
        </h2>

        <p className="text-gray-700 mb-4">
          To switch from Sandbox to Production mode, you'll need to update your
          code in several places:
        </p>

        <h3 className="text-xl font-semibold text-teal-600 mt-6 mb-3">
          1. Update OCIDProvider Component
        </h3>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// components/OCIDProvider.tsx
"use client";

import { ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";

interface OCIDProviderProps {
  children: ReactNode;
}

const opts = {
  clientId: "YOUR_AUTH_CLIENT_ID", // Required for production
  redirectUri: "https://yourdomain.com/redirect",
  referralCode: "YOUR_PARTNER_CODE",
};

const OCIDProvider: FC<OCIDProviderProps> = ({ children }) => (
  <OCConnect opts={opts} sandboxMode={false}> {/* Set to false for production */}
    {children}
  </OCConnect>
);

export default OCIDProvider;`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-teal-600 mt-6 mb-3">
          2. For JavaScript Integration
        </h3>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`import { OCAuthLive } from '@opencampus/ocid-connect-js';

// For production environment
const authSdk = new OCAuthLive({
  clientId: 'YOUR_AUTH_CLIENT_ID', // Required for production
});`}</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Verifying JWTs on the Backend
        </h2>

        <p className="text-gray-700 mb-4">
          For enhanced security in production, you should verify JWTs on your
          backend. The SDK provides JWKS endpoints for both environments:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// For Production
const JWKS_URL_LIVE = 'https://static.opencampus.xyz/jwks/jwks-live.json';

// For Sandbox
const JWKS_URL_SANDBOX = 'https://static.opencampus.xyz/jwks/jwks-sandbox.json';

// Example JWT verification function
const verifyJwt = async (jwt, jwkUrl) => {
  // Fetch JWKS and verify JWT
  // Implementation depends on your backend language/framework
};`}</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Production Best Practices
        </h2>

        <div className="space-y-4 mt-4">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>Error Handling:</strong> Implement comprehensive error
              handling for production scenarios to provide a smooth user
              experience.
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>JWT Verification:</strong> Always verify JWTs on your
              backend servers for secure communication.
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>Session Management:</strong> Implement proper session
              management including token refreshing when needed.
            </p>
          </div>

          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">
              <strong>User Permissions:</strong> Carefully manage user
              permissions based on the data received from OCID.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 mt-8">
          <p className="text-blue-700">
            <strong>Testing Tip:</strong> Before deploying to production,
            thoroughly test your integration using a staging environment that
            mimics your production setup but still uses the Sandbox OCID
            environment.
          </p>
        </div>
      </div>

      <TutorialNavigation />
    </div>
  );
}
