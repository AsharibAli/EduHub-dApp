import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialProgress from "@/components/TutorialProgress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OCID & OCA Integration Tutorial | EduKit",
  description: "Learn how to integrate Open Campus ID and Open Campus Achievements into your dApp",
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 my-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-teal-700 hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-teal-800 mt-2">
              OCID & OCA Tutorial
            </h1>
          </div>
          <TutorialProgress />
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 