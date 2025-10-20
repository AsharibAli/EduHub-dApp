"use client";

import OCEcosystemNavigation from "@/components/OCEcosystemNavigation";

export default function OCEcosystemIntroduction() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Welcome to the Open Campus Ecosystem
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What is the Open Campus Ecosystem?
        </h2>
        <p className="text-gray-700 mb-4">
          The Open Campus Ecosystem is a comprehensive platform designed to
          revolutionize digital education and credentialing. It combines
          blockchain technology with educational tools to create a secure,
          decentralized environment where learners can own their digital
          identity and achievements.
        </p>

        <p className="text-gray-700 mb-4">
          At its core, the ecosystem provides three main components that work
          together to create a seamless experience for students, educators, and
          institutions.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Key Concept:</strong> The Open Campus Ecosystem empowers
            users to own their digital identity and educational achievements on
            the blockchain, ensuring they have full control over their
            credentials.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          The Three Pillars of the Ecosystem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-600">OCID</h3>
            </div>
            <p className="text-gray-700 text-sm">
              <strong>Open Campus ID</strong> - Your secure digital identity
              that connects you to the entire ecosystem.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-600">OCA</h3>
            </div>
            <p className="text-gray-700 text-sm">
              <strong>Open Campus Achievements</strong> - Digital certificates
              and credentials that prove your learning accomplishments.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-600">OCB</h3>
            </div>
            <p className="text-gray-700 text-sm">
              <strong>Open Campus Badges</strong> - Special recognition tokens
              that showcase your skills and participation in the ecosystem.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why Choose the Open Campus Ecosystem?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🔐 Security & Privacy
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Blockchain-secured credentials</li>
              <li>You control your data</li>
              <li>Tamper-proof achievements</li>
              <li>Decentralized storage</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🌐 Universal Access
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Single identity across platforms</li>
              <li>Portable credentials</li>
              <li>Global recognition</li>
              <li>Easy sharing capabilities</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🚀 Innovation Ready
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Built for the future of education</li>
              <li>Integration with modern platforms</li>
              <li>Continuous ecosystem growth</li>
              <li>Community-driven development</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              📚 Educational Focus
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Designed for learners</li>
              <li>Support for educators</li>
              <li>Institution-friendly tools</li>
              <li>Skills-based credentialing</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What You'll Learn
        </h2>
        <p className="text-gray-700 mb-4">
          In this guide, we'll explore each component of the Open Campus
          Ecosystem in simple terms. You'll learn what each part does, why it's
          important, and how you can use these tools to enhance your educational
          journey.
        </p>

        <p className="text-gray-700 mb-4">
          No technical background is required! We'll explain everything in plain
          language so you can understand how this revolutionary system can
          benefit you as a learner, educator, or institution.
        </p>

        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-teal-700 mb-2">
            Ready to Explore?
          </h3>
          <p className="text-gray-700">
            Let's start by diving into OCID - your gateway to the Open Campus
            Ecosystem. Click "Next" to learn about your digital identity and how
            it works.
          </p>
        </div>
      </div>

      <OCEcosystemNavigation />
    </div>
  );
}
