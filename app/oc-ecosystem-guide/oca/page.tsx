"use client";

import OCEcosystemNavigation from "@/components/OCEcosystemNavigation";

export default function OCAPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Understanding Open Campus Achievements (OCA)
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What are Open Campus Achievements?
        </h2>
        <p className="text-gray-700 mb-4">
          Open Campus Achievements (OCA) are like digital diplomas or
          certificates that prove you've learned something or completed a
          course. Think of them as the modern, high-tech version of the paper
          certificates you might get from graduating school or completing an
          online course.
        </p>

        <p className="text-gray-700 mb-4">
          What makes OCAs special is that they're stored on the blockchain,
          which means they can't be faked, lost, or taken away from you. They're
          permanently yours and can be verified by anyone, anywhere in the
          world.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Simple Explanation:</strong> OCAs are like digital stickers
            that prove you learned something, but instead of being on paper,
            they're stored securely on the internet where they can never be lost
            or faked.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How Do OCAs Work?
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            The OCA Journey
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Learn Something New
                </h4>
                <p className="text-gray-700 text-sm">
                  Complete a course, pass a test, or finish a learning activity
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Achievement Created
                </h4>
                <p className="text-gray-700 text-sm">
                  The organization automatically creates a digital achievement
                  for you
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Stored in Your OCID
                </h4>
                <p className="text-gray-700 text-sm">
                  The achievement is securely stored in your OCID digital wallet
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Share and Verify
                </h4>
                <p className="text-gray-700 text-sm">
                  Show your achievements to employers, schools, or friends
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What's Inside an OCA?
        </h2>
        <p className="text-gray-700 mb-4">
          Each OCA contains important information about your achievement:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              📜 Achievement Details
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>What you learned or accomplished</li>
              <li>The name of the course or program</li>
              <li>Description of skills gained</li>
              <li>Date you earned the achievement</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🏛️ Issuer Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Name of the school or organization</li>
              <li>Who awarded the achievement</li>
              <li>Official stamps and signatures</li>
              <li>Contact information for verification</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              👤 Your Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Your OCID username</li>
              <li>When you received it</li>
              <li>Your performance or grade (if applicable)</li>
              <li>Special honors or distinctions</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🔐 Security Features
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Blockchain verification</li>
              <li>Digital signatures</li>
              <li>Tamper-proof design</li>
              <li>Unique identification number</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Types of Achievements You Can Earn
        </h2>

        <div className="space-y-4">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">🎓</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Course Completion
              </h4>
              <p className="text-gray-700 text-sm">
                Certificates for finishing online courses, workshops, or
                training programs
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">🏆</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Academic Excellence
              </h4>
              <p className="text-gray-700 text-sm">
                Recognition for outstanding performance, high grades, or
                academic achievements
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">💼</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Professional Skills
              </h4>
              <p className="text-gray-700 text-sm">
                Certifications for job-related skills, technical abilities, or
                professional training
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mr-4">🤝</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Community Participation
              </h4>
              <p className="text-gray-700 text-sm">
                Recognition for volunteering, community service, or
                participation in educational events
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Why Are OCAs Better Than Traditional Certificates?
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 my-6">
            <thead>
              <tr className="bg-teal-50">
                <th className="border border-gray-300 p-3 text-left">
                  Feature
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Traditional Certificates
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Open Campus Achievements
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">
                  Security
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  Can be forged or lost
                </td>
                <td className="border border-gray-300 p-3 text-green-700">
                  Tamper-proof on blockchain
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">
                  Verification
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  Hard to verify authenticity
                </td>
                <td className="border border-gray-300 p-3 text-green-700">
                  Instantly verifiable online
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">
                  Storage
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  Physical paper or files
                </td>
                <td className="border border-gray-300 p-3 text-green-700">
                  Permanent digital storage
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">
                  Sharing
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  Must make copies or scan
                </td>
                <td className="border border-gray-300 p-3 text-green-700">
                  Easy digital sharing
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">
                  Portability
                </td>
                <td className="border border-gray-300 p-3 text-gray-700">
                  Tied to issuing institution
                </td>
                <td className="border border-gray-300 p-3 text-green-700">
                  Follow you everywhere
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How to Use Your OCAs
        </h2>
        <p className="text-gray-700 mb-4">
          Once you've earned OCAs, you can use them in many ways:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              📝 Job Applications
            </h4>
            <p className="text-gray-700 text-sm">
              Include your OCAs in resumes and job applications to prove your
              skills
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              🎯 College Applications
            </h4>
            <p className="text-gray-700 text-sm">
              Show universities your achievements and continuous learning
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              💼 Professional Networking
            </h4>
            <p className="text-gray-700 text-sm">
              Share achievements on LinkedIn or professional profiles
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              📈 Personal Tracking
            </h4>
            <p className="text-gray-700 text-sm">
              Monitor your learning progress and set new goals
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Next Up: Open Campus Badges
          </h3>
          <p className="text-gray-700">
            Now that you understand OCAs, let's explore Open Campus Badges (OCB)
            - special recognition tokens that showcase your participation and
            achievements in the ecosystem in a unique way.
          </p>
        </div>
      </div>

      <OCEcosystemNavigation />
    </div>
  );
}
