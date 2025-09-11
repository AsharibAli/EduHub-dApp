import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OCEcosystemProgress from "@/components/OCEcosystemProgress";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OC Ecosystem Guide | EduKit",
  description: "Learn about the Open Campus Ecosystem: OCID, OCA, and OCB",
};

export default function OCEcosystemGuideLayout({
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
              OC Ecosystem Guide
            </h1>
          </div>
          <OCEcosystemProgress />

          <div className="bg-white p-8 rounded-lg shadow-md">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
