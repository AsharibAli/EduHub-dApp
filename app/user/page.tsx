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
import {
  User,
  Wallet,
  Clock,
  Shield,
  Home,
  LogOut,
  ArrowRight,
} from "lucide-react";

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
    if (isInitialized && authState?.isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }
  }, [isInitialized, authState?.isAuthenticated, redirectTo, router]);

  // Store redirect destination for use with the LoginButton
  useEffect(() => {
    if (redirectTo) {
      localStorage.setItem("redirectTo", redirectTo);
    }
  }, [redirectTo]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <h1 className="text-lg sm:text-xl font-bold mb-2 text-teal-800">
              Loading...
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Please wait while we initialize authentication.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center px-4 py-8">
          <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="text-lg font-semibold text-red-800">
                Authentication Error
              </h2>
            </div>
            <p className="text-sm sm:text-base text-red-600 mb-4">
              {authState.error.message}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-red-600 hover:bg-red-700 text-white touch-manipulation"
            >
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
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
      <div className="min-h-screen flex flex-col bg-teal-50">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-8 mt-16 sm:mt-20">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              {userInfo ? (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <User className="h-8 w-8 text-teal-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-800 mb-3 leading-tight">
                    Welcome to Open Campus ID
                  </CardTitle>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                    Here are your OCID details:
                  </p>
                </>
              ) : (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <Shield className="h-8 w-8 text-teal-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold mb-4 text-teal-800">
                    Connect with OCID
                  </CardTitle>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                    {redirectTo
                      ? "Please connect your OCID to start the guide."
                      : "Please link with Open Campus to view your details."}
                  </p>
                  <LoginButton className="w-full sm:w-auto" />
                </div>
              )}
            </CardHeader>

            {userInfo && (
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm font-semibold text-teal-700">
                        User Information
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          User ID:
                        </span>
                        <span className="text-gray-900 font-mono">
                          {userInfo.user_id}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          Username:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {userInfo.edu_username}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Wallet className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-semibold text-blue-700">
                        Wallet Information
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700 mb-1">
                          Wallet Address:
                        </span>
                        <span className="text-gray-900 font-mono text-xs sm:text-sm break-all bg-white p-2 rounded border">
                          {userInfo.eth_address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-gray-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-700">
                        Session Information
                      </span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          Issuer:
                        </span>
                        <span className="text-gray-900">{userInfo.iss}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          Issued At:
                        </span>
                        <span className="text-gray-900">
                          {new Date(userInfo.iat * 1000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          Expires:
                        </span>
                        <span className="text-gray-900">
                          {new Date(userInfo.exp * 1000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-700">
                          Audience:
                        </span>
                        <span className="text-gray-900">EduHub</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            <CardFooter className="p-4 sm:p-6">
              <div className="flex flex-col w-full space-y-3">
                {redirectTo && userInfo && (
                  <Button
                    onClick={() => router.push(redirectTo)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg touch-manipulation flex items-center justify-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Continue to{" "}
                    {redirectTo.includes("oc-ecosystem-guide")
                      ? "OC Ecosystem Guide"
                      : "Workshop"}
                  </Button>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="flex-1 py-3 px-4 touch-manipulation flex items-center justify-center"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go to Home
                  </Button>

                  {userInfo && (
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="flex-1 py-3 px-4 touch-manipulation flex items-center justify-center text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
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
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow flex justify-center items-center px-4 py-8">
            <div className="text-center max-w-md mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <h1 className="text-lg sm:text-xl font-bold mb-2 text-teal-800">
                Loading...
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Please wait while we load the page...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <UserPageContent />
    </Suspense>
  );
};

export default UserPage;
