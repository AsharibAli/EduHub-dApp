"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoAlert from "@/components/InfoAlert";
import ContentCard from "@/components/ContentCard";
import { ArrowRight, AlertCircle } from "lucide-react";
import {
  hasClaimedCredential,
  getUserClaimedCredentials,
} from "@/utils/credentialStorage";

export default function Home() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const isConnected = isInitialized && authState?.isAuthenticated;
  const [workshopProgress, setWorkshopProgress] = useState<string>("");
  const [guideProgress, setGuideProgress] = useState<string>("");
  const [hasGuideCredential, setHasGuideCredential] = useState<boolean>(false);
  const [hasBootcampCredential, setHasBootcampCredential] =
    useState<boolean>(false);

  // Check for saved progress and claimed credentials on component mount and when auth state changes
  useEffect(() => {
    if (typeof window !== "undefined" && isConnected) {
      const { workshop, tutorial } = getProgress();
      const ocid = ocAuth?.getAuthState()?.OCId;

      if (workshop.lastVisitedPage) {
        setWorkshopProgress(workshop.lastVisitedPage);
      }

      if (tutorial.lastVisitedPage) {
        setGuideProgress(tutorial.lastVisitedPage);
      }

      // Check if user has claimed credentials
      if (ocid) {
        setHasGuideCredential(hasClaimedCredential(ocid, "tutorial"));
        setHasBootcampCredential(hasClaimedCredential(ocid, "bootcamp"));
      }
    } else {
      // Clear progress state when user is not authenticated
      setWorkshopProgress("");
      setGuideProgress("");
      setHasGuideCredential(false);
      setHasBootcampCredential(false);
    }
  }, [isConnected, ocAuth]);

  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-16 sm:mt-10">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-800 mb-4 sm:mb-6 leading-tight">
            EduHub
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-teal-600 max-w-2xl mx-auto leading-relaxed px-2">
            A simple learning dApp that allows you to first learn and then prove
            it by minting verifiable credentials.
          </p>
        </div>

        {/* EduPlus Badge Section - Always Visible */}
        <div className="mb-8 max-w-6xl mx-auto">
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-xl blur-sm opacity-75 animate-pulse"></div>
            {/* Main content */}
            <div className="relative bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 sm:p-6 text-white">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-teal-600 text-xl font-bold">E+</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                      EduPlus Achievement Badge
                    </h2>
                    <p className="text-teal-100 text-sm sm:text-base mb-3">
                      Complete both Workshop and OC Ecosystem Guide to earn this
                      exclusive badge with 1,000 Yuzu points!
                    </p>
                    <Link href={isConnected ? "/eduplus" : "/user"}>
                      <Button className="bg-white text-teal-600 hover:bg-teal-50 font-semibold">
                        {isConnected
                          ? "Check Eligibility →"
                          : "Connect OCID to Begin →"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Workshop Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-800 mb-3 sm:mb-2">
                Workshop
              </h2>
              <ContentCard>
                <h3 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3">
                  Intro to Blockchain
                </h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                  A comprehensive introductory level course for beginners who
                  want to get started in blockchain and Web3 technologies. Learn
                  the fundamentals and core concepts in this three-day bootcamp.
                </p>

                {/* Show continue button only if progress exists AND user is authenticated AND hasn't claimed bootcamp credential */}
                {isConnected && workshopProgress && !hasBootcampCredential && (
                  <InfoAlert
                    variant="success"
                    icon={ArrowRight}
                    title="You have unfinished progress"
                    className="mb-4"
                  >
                    <Link href={workshopProgress}>
                      <span className="text-teal-600 hover:underline text-sm sm:text-base">
                        Continue where you left off
                      </span>
                    </Link>
                  </InfoAlert>
                )}

                {!isConnected && (
                  <InfoAlert
                    variant="warning"
                    icon={AlertCircle}
                    className="mb-4"
                  >
                    <span className="text-sm sm:text-base">
                      Connect your OCID before starting this workshop to track
                      your progress.
                    </span>
                  </InfoAlert>
                )}
                <Link
                  href={
                    isConnected
                      ? "/workshop/day-one"
                      : "/user?redirectTo=/workshop/day-one"
                  }
                >
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2 px-4 sm:px-4 touch-manipulation">
                    {isConnected
                      ? "Start Workshop"
                      : "Connect OCID & Start Workshop"}
                  </Button>
                </Link>
              </ContentCard>
            </div>
          </div>

          {/* OC Ecosystem Guide Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-800 mb-3 sm:mb-2">
                Guide
              </h2>
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3">
                  Intro to OC Ecosystem
                </h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                  A comprehensive guide to the Open Campus Ecosystem, covering the foundational components of OCID, OCA, and OCB.
                </p>

                {/* Show continue button only if progress exists AND user is authenticated AND hasn't claimed guide credential */}
                {isConnected && guideProgress && !hasGuideCredential && (
                  <div className="bg-teal-50 p-3 rounded-md flex items-start mb-4 border border-teal-200">
                    <ArrowRight className="w-5 h-5 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-teal-700 font-medium">
                        You have unfinished progress
                      </p>
                      <Link href={guideProgress}>
                        <span className="text-xs text-teal-600 hover:underline">
                          Continue where you left off
                        </span>
                      </Link>
                    </div>
                  </div>
                )}

                {!isConnected && (
                  <div className="bg-amber-50 p-3 rounded-md flex items-start mb-4 border border-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      You'll need to connect with your OCID to complete this
                      guide and claim your achievement.
                    </p>
                  </div>
                )}
                <Link
                  href={
                    isConnected
                      ? "/oc-ecosystem-guide/oc-ecosystem/introduction"
                      : "/user?redirectTo=/oc-ecosystem-guide/oc-ecosystem/introduction"
                  }
                >
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2 px-4 sm:px-4 touch-manipulation">
                    {isConnected
                      ? "Start OC Ecosystem Guide"
                      : "Connect OCID & Start Guide"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
