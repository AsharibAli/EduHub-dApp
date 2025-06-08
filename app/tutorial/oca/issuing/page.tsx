"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function OCAIssuing() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Issuing Open Campus Achievements
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Prerequisites for Issuing OCAs
        </h2>

        <p className="text-gray-700 mb-4">
          Before you can issue Open Campus Achievements (OCAs), ensure you have:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>An OC ID for your organization (to be used as the issuer ID)</li>
          <li>An API key obtained from Open Campus</li>
          <li>
            OCID Connect implementation for your users (to get their OCID)
          </li>
        </ul>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Note:</strong> For security reasons, API calls to issue
            credentials should ideally be made from your backend, not directly
            from the client-side code. The examples here are for demonstration
            purposes.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          The OCA Issuance API
        </h2>

        <p className="text-gray-700 mb-4">
          Open Campus provides a REST API for issuing achievements. The primary
          endpoint is:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>POST https://api.vc.opencampus.xyz/issuer/vc</pre>
        </div>

        <p className="text-gray-700 mb-4">
          For development and testing, you can use the sandbox endpoint:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>POST https://api.vc.staging.opencampus.xyz/issuer/vc</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Creating the Credential Payload
        </h2>

        <p className="text-gray-700 mb-4">
          The OCA API requires a specific credential payload structure that
          follows the Open Badges standard. Here's an example of a complete
          credential payload:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// Create the credential payload
const credentialPayload = {
  validFrom: "2024-09-20T16:00:00.000Z",
  awardedDate: "2024-09-20T16:00:00.000Z",
  description: "Completed the OCID and OCA Integration Course",
  credentialSubject: {
    name: "John Doe",
    type: "Person",
    email: "johndoe@example.com",
    image: "https://educhain.dev/images/course-completion.png",
    profileUrl: "https://id.opencampus.xyz/profile/johndoe.edu",
    achievement: {
      name: "OCID & OCA Integration Master",
      identifier: "edukit:12345", // A unique identifier
      description: "Successfully completed the comprehensive course on integrating OCID Connect and Open Campus Achievements.",
      achievementType: "Certificate"
    }
  }
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-teal-600 mt-6 mb-3">
          Required Fields
        </h3>

        <table className="min-w-full bg-white border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Field
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Required
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                validFrom
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Date from which the credential is valid (ISO format)
              </td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                awardedDate
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Date when the credential was awarded (ISO format)
              </td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                description
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Description of the credential
              </td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                credentialSubject
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Object containing recipient and achievement details
              </td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Making the API Request
        </h2>

        <p className="text-gray-700 mb-4">
          To issue a credential, make a POST request to the API endpoint with
          the credential payload:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// Example API request to issue a credential
async function issueCredential(holderOcId, credentialPayload) {
  try {
    const response = await fetch('https://api.vc.staging.opencampus.xyz/issuer/vc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'YOUR_API_KEY' // Replace with your actual API key
      },
      body: JSON.stringify({
        credentialPayload,
        holderOcId // The OCID of the credential recipient
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(\`OCA API error: \${errorData.message || response.statusText}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error issuing OCA credential:', error);
    throw error;
  }
}`}</pre>
        </div>

        <p className="text-gray-700 mb-4">
          The recipient must have an OCID to receive credentials. You should
          obtain this from the user through OCID Connect.
        </p>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Achievement Types
        </h2>

        <p className="text-gray-700 mb-4">
          The OCA system supports various achievement types as defined in the
          Open Badges standard. Some common types include:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Achievement</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Certificate</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Badge</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Certification</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Competency</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Degree</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">MicroCredential</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-teal-700">Course</span>
          </div>
        </div>

        <p className="text-gray-700 mt-4">
          Choose the achievement type that best represents the credential you're
          issuing.
        </p>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Adding Images to Credentials
        </h2>

        <p className="text-gray-700 mb-4">
          Images make credentials more visually appealing and recognizable. You
          can add images at two levels:
        </p>

        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-teal-600 mb-2">
            Top Level Image
          </h3>
          <p className="text-gray-700 mb-2">
            This represents the logo of your institution or issuing
            organization. Use a square aspect ratio with at least 1300×1300px
            resolution for optimal display.
          </p>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            "image": "https://example.com/your-organization-logo.png"
          </pre>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-teal-600 mb-2">
            Achievement Level Image
          </h3>
          <p className="text-gray-700 mb-2">
            This represents the specific achievement, such as a badge or
            certificate design. Recommended aspect ratio is 4:3 (landscape) or
            3:4 (portrait).
          </p>
          <pre className="bg-gray-100 p-2 rounded text-sm">{`"achievement": {
  // other fields...
  "image": "https://example.com/achievement-badge.png"
}`}</pre>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="text-blue-700">
            <strong>Best Practice:</strong> Host your credential images on a
            reliable CDN or permanent storage to ensure they remain accessible
            for the lifetime of the credential.
          </p>
        </div>
      </div>

      <TutorialNavigation />
    </div>
  );
}
