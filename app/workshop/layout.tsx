import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 my-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-teal-700 hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-teal-800 mt-2">
              Blockchain Workshop
            </h1>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 