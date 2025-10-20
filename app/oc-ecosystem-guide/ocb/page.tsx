"use client";

import OCEcosystemNavigation from "@/components/OCEcosystemNavigation";

export default function OCBPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Understanding Open Campus Badges (OCB)
      </h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What are Open Campus Badges?
        </h2>
        <p className="text-gray-700 mb-4">
          Open Campus Badges (OCB) are special digital collectibles that
          recognize your participation, achievements, and milestones within the
          Open Campus ecosystem. Think of them like digital stickers or trading
          cards that you collect as you engage with different educational
          activities and platforms.
        </p>

        <p className="text-gray-700 mb-4">
          While OCAs (achievements) focus on proving what you've learned, OCBs
          are more about celebrating your journey and participation. They're
          like commemorative tokens that show you were part of something special
          - a course launch, a community event, or reaching a learning
          milestone.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
          <p className="text-teal-700">
            <strong>Think of it this way:</strong> If OCAs are like your
            diploma, OCBs are like the fun stickers and patches you collect
            along the way to show your journey and involvement in the community.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How Are OCBs Different from OCAs?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-5 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              🏆 Open Campus Achievements (OCA)
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">📚</span>
                <span>Prove what you've learned</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎓</span>
                <span>Formal educational credentials</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💼</span>
                <span>Used for professional purposes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📜</span>
                <span>Like digital diplomas</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-5 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center">
              🎖️ Open Campus Badges (OCB)
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">🎉</span>
                <span>Celebrate participation and milestones</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🌟</span>
                <span>Fun, collectible recognition</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👥</span>
                <span>Show community involvement</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎁</span>
                <span>Like digital stickers or patches</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Types of Open Campus Badges
        </h2>

        <div className="space-y-4">
          <div className="flex items-start p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="text-2xl mr-4">🚀</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Early Adopter Badges
              </h4>
              <p className="text-gray-700 text-sm">
                Given to users who join new platforms or participate in beta
                testing. These show you're always exploring new educational
                opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
            <div className="text-2xl mr-4">📅</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Event Participation Badges
              </h4>
              <p className="text-gray-700 text-sm">
                Commemorative badges for attending workshops, webinars,
                conferences, or special educational events in the ecosystem.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="text-2xl mr-4">🎯</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Milestone Badges
              </h4>
              <p className="text-gray-700 text-sm">
                Recognition for reaching important learning milestones, like
                completing your 10th course or studying for 100 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="text-2xl mr-4">🤝</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Community Badges
              </h4>
              <p className="text-gray-700 text-sm">
                Awarded for helping others, contributing to discussions, or
                being an active member of learning communities.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
            <div className="text-2xl mr-4">⭐</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Special Edition Badges
              </h4>
              <p className="text-gray-700 text-sm">
                Limited-time badges for special occasions, partnerships, or
                unique educational initiatives.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How Do You Earn OCBs?
        </h2>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            Ways to Earn Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Participate in educational events
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Be among the first to try new features
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Reach learning milestones
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">Help other learners</p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Complete special challenges
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Engage actively with the community
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Special Features of OCBs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🎨 Unique Designs
            </h3>
            <p className="text-gray-700 text-sm">
              Each badge has its own special artwork and design that makes it
              unique and collectible.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🔢 Limited Quantity
            </h3>
            <p className="text-gray-700 text-sm">
              Some badges are only available for a limited time or to a limited
              number of people, making them rare.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              💰 Potential Value
            </h3>
            <p className="text-gray-700 text-sm">
              As NFTs on the blockchain, some badges may have collectible value
              in the future.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🏪 Tradeable
            </h3>
            <p className="text-gray-700 text-sm">
              Unlike OCAs, some badges can be traded or gifted to other users in
              the ecosystem.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              📱 Interactive
            </h3>
            <p className="text-gray-700 text-sm">
              Badges can unlock special features, rewards, or access to
              exclusive content and communities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">
              🌍 Cross-Platform
            </h3>
            <p className="text-gray-700 text-sm">
              Your badges work across all platforms in the Open Campus ecosystem
              and can be displayed anywhere.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Benefits of Collecting OCBs
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
              <span className="mr-2">🎯</span>
              Motivation and Engagement
            </h4>
            <p className="text-gray-700 text-sm">
              Badges provide fun goals to work towards and keep you motivated to
              participate in educational activities.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
              <span className="mr-2">👥</span>
              Community Recognition
            </h4>
            <p className="text-gray-700 text-sm">
              Show others your involvement and dedication to learning within the
              Open Campus community.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
              <span className="mr-2">🔓</span>
              Exclusive Access
            </h4>
            <p className="text-gray-700 text-sm">
              Some badges may unlock special features, early access to new
              courses, or exclusive community areas.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
              <span className="mr-2">📈</span>
              Personal Achievement Tracking
            </h4>
            <p className="text-gray-700 text-sm">
              Badges help you visualize your learning journey and see how much
              you've accomplished over time.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          How to Display Your OCBs
        </h2>
        <p className="text-gray-700 mb-4">
          Once you earn badges, you can showcase them in various ways:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              🏠 OCID Profile
            </h4>
            <p className="text-gray-700 text-sm">
              Display your favorite badges on your public OCID profile
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              📱 Social Media
            </h4>
            <p className="text-gray-700 text-sm">
              Share your achievements on social platforms to show your learning
              journey
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              💼 Professional Profiles
            </h4>
            <p className="text-gray-700 text-sm">
              Include relevant badges in your LinkedIn or professional
              portfolios
            </p>
          </div>
          <div className="p-4 border border-teal-200 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">
              🎨 Digital Collections
            </h4>
            <p className="text-gray-700 text-sm">
              Organize and curate your badge collection like a digital gallery
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold text-teal-700 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-700 mb-3">
            You now understand all three components of the Open Campus
            Ecosystem:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-3">
            <li>
              <strong>OCID</strong> - Your digital identity and gateway to the
              ecosystem
            </li>
            <li>
              <strong>OCA</strong> - Your formal educational achievements and
              credentials
            </li>
            <li>
              <strong>OCB</strong> - Your collectible badges and community
              recognition
            </li>
          </ul>
          <p className="text-gray-700">
            You're ready to complete this guide and start your journey in the
            Open Campus Ecosystem!
          </p>
        </div>
      </div>

      <OCEcosystemNavigation />
    </div>
  );
}
