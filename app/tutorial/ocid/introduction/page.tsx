"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function OCIDIntroduction() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Introduction to Open Campus ID
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What is Open Campus ID?
        </h2>
        <p className="text-gray-700 mb-4">
          Open Campus ID (OCID) is a Soulbound Token (SBT), a non-transferable
          NFT that represents a learner's online persona. As part of Open
          Campus's blockchain protocol, it issues Decentralized Identifiers
          (DIDs) in the form of SBTs.
        </p>

        <p className="text-gray-700 mb-4">
          These tokens give learners full control over their information. They
          can choose what details to associate with their OC ID, such as their
          learning profile, and decide when and with whom to share them.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Key Concept:</strong> OCID serves as a digital identity in
            the Open Campus ecosystem, allowing users to own their educational
            data and control their privacy.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why Integrate OCID Connect?
        </h2>
        <p className="text-gray-700 mb-4">
          The OCID Connect SDK makes it simple to integrate Open Campus's secure
          authentication system into your application. It provides pre-built
          tools like a JavaScript wrapper and React components to save you time
          and effort.
        </p>

        <p className="text-gray-700 mb-4">
          The SDK also adheres to the OpenID Connect (OIDC) standard, ensuring
          high security and compatibility with existing authentication systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Benefits for Developers
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Simplified user authentication</li>
              <li>Access to the Open Campus ecosystem</li>
              <li>Ready-made React components</li>
              <li>Support for multiple environments</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              Benefits for Users
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Single identity across dApps</li>
              <li>Control over personal data</li>
              <li>Secure authentication</li>
              <li>Portable achievements and credentials</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          OCID Connect SDK Overview
        </h2>
        <p className="text-gray-700 mb-4">
          The OCID Connect SDK is a JavaScript-based tool that lets you
          integrate OCID into your app or platform. It provides a &quot;Connect
          with OCID&quot; button similar to &quot;Login with Google&quot; or
          &quot;Login with Twitter.&quot;
        </p>

        <p className="text-gray-700 mb-4">
          With this SDK, your users can securely link their OCIDs to your
          platform, giving them access to the Open Campus ecosystem. In the next
          steps, we'll learn how to set up and configure the SDK in your dApp.
        </p>
      </div>

      <TutorialNavigation />
    </div>
  );
}
