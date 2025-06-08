"use client";

import TutorialNavigation from "@/components/TutorialNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OCIDSetup() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Setting Up OCID Connect
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Prerequisites
        </h2>
        <p className="text-gray-700 mb-4">
          Before integrating OCID Connect, ensure you have:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>A React or Next.js project set up</li>
          <li>Node.js and npm/yarn installed</li>
          <li>
            For production: An Auth Client ID (contact Open Campus Ambassador)
          </li>
        </ul>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Note:</strong> For Sandbox mode, you don't need a Client ID.
            The Sandbox environment is separate from Production - OCIDs
            registered in one environment don't exist in the other.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Installation
        </h2>
        <p className="text-gray-700 mb-4">
          First, install the OCID Connect SDK in your project:
        </p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>npm install @opencampus/ocid-connect-js</pre>
        </div>

        <p className="text-gray-700 mb-4">Or if you're using yarn:</p>

        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>yarn add @opencampus/ocid-connect-js</pre>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Integration Methods
        </h2>

        <Tabs defaultValue="react">
          <TabsList className="mb-4">
            <TabsTrigger value="react">React/Next.js</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          </TabsList>

          <TabsContent value="react" className="mt-4">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              React/Next.js Integration
            </h3>

            <p className="text-gray-700 mb-4">
              1. Create a wrapper component for OCID Connect:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// components/OCIDProvider.tsx
"use client";

import { ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";

interface OCIDProviderProps {
  children: ReactNode;
}

const opts = {
  clientId: "<Does_Not_Matter_For_Sandbox_mode>",
  redirectUri: "http://localhost:3000/redirect",
  referralCode: "PARTNER6", // All characters must be CAPS
};

const OCIDProvider: FC<OCIDProviderProps> = ({ children }) => (
  <OCConnect opts={opts} sandboxMode={true}>
    {children}
  </OCConnect>
);

export default OCIDProvider;`}</pre>
            </div>

            <p className="text-gray-700 mb-4">
              2. Add the provider to your layout:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// app/layout.tsx
import OCIDProvider from "../components/OCIDProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OCIDProvider>
          {children}
        </OCIDProvider>
      </body>
    </html>
  );
}`}</pre>
            </div>

            <p className="text-gray-700 mb-4">
              3. Create a redirect page to handle authentication callbacks:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// app/redirect/page.tsx
"use client";

import { LoginCallBack, useOCAuth } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/navigation";

function CustomErrorComponent() {
  const { authState } = useOCAuth();
  return <div>Error Logging in: {authState.error?.message}</div>;
}

function CustomLoadingComponent() {
  return <div>Loading....</div>;
}

export default function RedirectPage() {
  const router = useRouter();
  
  const loginSuccess = () => {
    router.push("/"); // Redirect after successful login
  };
  
  const loginError = (error) => {
    console.error("Login error:", error);
  };
  
  return (
    <LoginCallBack 
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={CustomErrorComponent}
      customLoadingComponent={CustomLoadingComponent}
    />
  );
}`}</pre>
            </div>

            <p className="text-gray-700 mb-4">
              4. Create a login button component:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// components/LoginButton.tsx
"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";

export default function LoginButton() {
  const { ocAuth } = useOCAuth();
  
  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  return <button onClick={handleLogin}>Login with OCID</button>;
}`}</pre>
            </div>

            <p className="text-gray-700 mb-4">
              5. Use the button in your page:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// app/page.tsx
"use client";

import LoginButton from "../components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";

export default function Home() {
  const { isInitialized, authState } = useOCAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Welcome to My App</h1>
      {authState.isAuthenticated ? (
        <p>You are logged in as {authState.eduUsername}!</p>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}`}</pre>
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="mt-4">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              JavaScript Integration
            </h3>

            <p className="text-gray-700 mb-4">
              1. Initialize the SDK in your JavaScript file:
            </p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`import { OCAuthSandbox } from '@opencampus/ocid-connect-js';

// For development/sandbox mode
const authSdk = new OCAuthSandbox();

// For production mode
// const authSdk = new OCAuthLive({
//   clientId: 'your_client_id',
// });`}</pre>
            </div>

            <p className="text-gray-700 mb-4">2. Start the login process:</p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// Add a login button to your page
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
  try {
    await authSdk.signInWithRedirect({ state: 'opencampus' });
  } catch (error) {
    console.error('Login error:', error);
  }
});`}</pre>
            </div>

            <p className="text-gray-700 mb-4">3. Handle the login response:</p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// On your redirect page
async function handleRedirect() {
  try {
    const authState = await authSdk.handleLoginRedirect();
    if (authState.idToken) {
      console.log('Login successful:', authState);
      window.location.href = '/dashboard'; // Redirect after login
    } else {
      console.log('Login incomplete');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

// Call this function when the redirect page loads
window.onload = handleRedirect;`}</pre>
            </div>

            <p className="text-gray-700 mb-4">4. Access user info:</p>

            <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
              <pre>{`// Get OCID and wallet address
function displayUserInfo() {
  const userOCId = authSdk.getAuthState().OCId;
  const walletAddress = authSdk.getAuthState().ethAddress;
  
  document.getElementById('user-ocid').textContent = userOCId;
  document.getElementById('wallet-address').textContent = walletAddress;
}`}</pre>
            </div>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Configuration Options
        </h2>

        <p className="text-gray-700 mb-4">
          The OCID Connect SDK offers several configuration options:
        </p>

        <table className="min-w-full bg-white border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Property
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                clientId
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Your Auth Client ID (required for production)
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                redirectUri
              </td>
              <td className="border border-gray-300 px-4 py-2">
                URL to return to after login completion
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                referralCode
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Partner tracking code for OCID registrations
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                storageType
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Use 'cookie' or default localStorage
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TutorialNavigation />
    </div>
  );
}
