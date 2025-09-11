"use client";

import OCEcosystemNavigation from "@/components/OCEcosystemNavigation";

export default function OCIDPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Understanding Open Campus ID (OCID)
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What is OCID?
        </h2>
        <p className="text-gray-700 mb-4">
          Think of OCID (Open Campus ID) as your digital passport for the
          educational world. Just like how you have a physical ID card or
          passport that proves who you are, OCID is your unique digital identity
          that represents you across all Open Campus platforms and services.
        </p>

        <p className="text-gray-700 mb-4">
          Unlike traditional usernames and passwords that you create for
          different websites, OCID is a permanent, secure digital identity that
          you own completely. It's built on blockchain technology, which means
          it's secure, can't be faked, and you have full control over it.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Simple Analogy:</strong> OCID is like having a digital
            driver's license for the internet - it proves you are who you say
            you are, and you can use it anywhere that accepts it.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Key Features of OCID
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🔒 You Own It
            </h3>
            <p className="text-gray-700 text-sm">
              Unlike accounts on social media platforms, your OCID belongs to
              you completely. No company can take it away or delete it.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🌍 Works Everywhere
            </h3>
            <p className="text-gray-700 text-sm">
              Use the same OCID to log into any platform in the Open Campus
              ecosystem. No need to create multiple accounts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🛡️ Super Secure
            </h3>
            <p className="text-gray-700 text-sm">
              Built on blockchain technology, making it extremely difficult for
              hackers to steal or impersonate your identity.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🎓 Education Focused
            </h3>
            <p className="text-gray-700 text-sm">
              Designed specifically for educational purposes, making it perfect
              for students, teachers, and educational institutions.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How Does OCID Work?
        </h2>
        <p className="text-gray-700 mb-4">
          When you create an OCID, you get a unique username (like "alice.edu"
          or "john.student") that identifies you across the Open Campus
          ecosystem. This username is connected to a secure digital wallet that
          stores all your educational achievements and credentials.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            How to Get Started with OCID
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Visit the OCID Registration:</strong> Go to the Open
                Campus ID website
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Choose Your Username:</strong> Pick a unique username
                that represents you
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Secure Your Account:</strong> Set up security measures
                to protect your OCID
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Start Using:</strong> Begin connecting to educational
                platforms and earning achievements
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What Can You Do with OCID?
        </h2>

        <div className="space-y-4">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">📚</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Access Educational Platforms
              </h4>
              <p className="text-gray-700 text-sm">
                Use your OCID to log into various learning platforms and
                educational apps.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">🏆</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Collect Achievements
              </h4>
              <p className="text-gray-700 text-sm">
                Automatically receive and store digital certificates and
                achievements in your OCID.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">👥</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Connect with Others
              </h4>
              <p className="text-gray-700 text-sm">
                Share your educational profile and connect with fellow learners
                and educators.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">🔄</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Port Your Credentials
              </h4>
              <p className="text-gray-700 text-sm">
                Take your achievements with you wherever you go - they're
                permanently yours.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why is OCID Important?
        </h2>
        <p className="text-gray-700 mb-4">
          In the traditional educational system, your certificates and
          achievements are often scattered across different institutions and
          platforms. You might have transcripts from one school, certificates
          from online courses on another platform, and professional credentials
          from yet another organization.
        </p>

        <p className="text-gray-700 mb-4">
          OCID solves this problem by giving you a single, permanent place to
          store and showcase all your educational achievements. It's like having
          a digital backpack that follows you throughout your entire learning
          journey.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Ready for the Next Step?
          </h3>
          <p className="text-gray-700">
            Now that you understand OCID, let's explore Open Campus Achievements
            (OCA) - the digital certificates and credentials that make your
            learning visible and verifiable.
          </p>
        </div>
      </div>

      <OCEcosystemNavigation />
    </div>
  );
}
