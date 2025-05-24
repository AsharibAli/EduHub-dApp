"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginButton from "../../components/LoginButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, Suspense } from "react";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

// Component that uses useSearchParams must be wrapped in Suspense
function UserPageContent() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  const handleLogout = async () => {
    // Redirect back to home page after logout
    await ocAuth.logout({ returnUrl: window.location.origin });
  };

  useEffect(() => {
    // If user is authenticated and there's a redirect path, go there
    if (isInitialized && authState.isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }
  }, [isInitialized, authState.isAuthenticated, redirectTo, router]);

  // Store redirect destination for use with the LoginButton
  useEffect(() => {
    if (redirectTo) {
      localStorage.setItem("redirectTo", redirectTo);
    }
  }, [redirectTo]);

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we initialize authentication.</p>
        </div>
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md shadow-md">
          <p className="text-red-600">Error: {authState.error.message}</p>
        </div>
      </div>
    );
  } else {
    let userInfo: DecodedToken | null = null;

    // Only try to decode token on client side
    if (typeof window !== "undefined" && authState.idToken) {
      try {
        userInfo = jwtDecode<DecodedToken>(authState.idToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    return (
      <div className="App min-h-screen flex flex-col items-center justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow w-full mt-24 px-4">
          <Card className=" w-full max-w-2xl p-8 shadow-lg">
            <CardHeader>
              {userInfo ? (
                <>
                  <CardTitle className="text-center text-4xl font-bold mt-2">
                    Welcome to Open Campus ID
                  </CardTitle>
                  <p className="mb-6 text-gray-600 text-center font-bold text-xl">
                    Here are your OCID details:
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <CardTitle className="text-2xl font-bold mb-4">
                    Connect with OCID
                  </CardTitle>
                  <p className="mb-6 text-gray-600">
                    {redirectTo
                      ? "Please connect your OCID to start the tutorial."
                      : "Please link with open campus to view your details."}
                  </p>
                  <LoginButton />
                </div>
              )}
            </CardHeader>
            {userInfo && (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>User ID:</strong> {userInfo.user_id}
                  </p>
                  <p>
                    <strong>Username:</strong> {userInfo.edu_username}
                  </p>
                  <p>
                    <strong>Wallet Address:</strong>{" "}
                    {userInfo.eth_address}
                  </p>
                  <p>
                    <strong>Issuer:</strong> {userInfo.iss}
                  </p>
                  <p>
                    <strong>Issued At:</strong>{" "}
                    {new Date(userInfo.iat * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Expiration:</strong>{" "}
                    {new Date(userInfo.exp * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Audience:</strong> app.eduhub.dev
                  </p>
                </div>
              </CardContent>
            )}
            <CardFooter className="flex flex-wrap justify-center gap-4 mt-4">
              <Button
                onClick={() => router.push("/")}
                className="bg-teal-400 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded-md"
              >
                Go to Home
              </Button>

              {userInfo && (
                <Button
                  onClick={handleLogout}
                  className="bg-teal-400 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded-md"
                >
                  Log Out
                </Button>
              )}

              {redirectTo && userInfo && (
                <Button
                  onClick={() => router.push(redirectTo)}
                  className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-md"
                >
                  Continue to{" "}
                  {redirectTo.includes("tutorial") ? "Tutorial" : "Workshop"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

// Main component with Suspense boundary
const UserPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">Loading...</h1>
            <p>Please wait while we load the page...</p>
          </div>
        </div>
      }
    >
      <UserPageContent />
    </Suspense>
  );
};

export default UserPage;
