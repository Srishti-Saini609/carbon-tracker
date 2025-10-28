import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Guides() {
  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Guides</h1>
          <p className="text-gray-600 mb-8">
            Explore sustainability guides to start or deepen your eco journey.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Getting Started Guide */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Getting Started Guide
              </h2>
              <p className="text-gray-600 mb-4">
                Your first steps toward sustainable living
              </p>

              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=60"
                alt="Getting Started"
                className="rounded-xl w-full h-48 object-cover mb-4"
              />

              <ol className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="bg-lime-300 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Assess Your Current Impact
                    </p>
                    <p className="text-gray-600 text-sm">
                      Calculate your baseline carbon footprint
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-lime-300 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Choose Priority Areas
                    </p>
                    <p className="text-gray-600 text-sm">
                      Focus on high-impact changes first
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-lime-300 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Track Your Progress
                    </p>
                    <p className="text-gray-600 text-sm">
                      Monitor improvements over time
                    </p>
                  </div>
                </li>
              </ol>

              <button className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 rounded-lg transition">
                Start Your Journey
              </button>
            </div>

            {/* Right: Advanced Strategies */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Advanced Strategies
              </h2>
              <p className="text-gray-600 mb-4">
                Deep-dive into comprehensive sustainability practices
              </p>

              <img
                src="https://cdn3.vectorstock.com/i/1000x1000/74/92/nature-related-icon-on-background-for-graphic-vector-24617492.jpg"
                alt="Advanced Strategies"
                className="rounded-xl w-full h-48 object-cover mb-4"
              />

              <div className="space-y-3">
                <div className="bg-green-100 text-gray-900 rounded-lg px-4 py-3">
                  <p className="font-semibold">Carbon Offsetting</p>
                  <p className="text-sm text-gray-700">
                    Learn about verified offset programs and their effectiveness
                  </p>
                </div>

                <div className="bg-green-100 text-gray-900 rounded-lg px-4 py-3">
                  <p className="font-semibold">Circular Economy</p>
                  <p className="text-sm text-gray-700">
                    Implement reduce, reuse, recycle principles in daily life
                  </p>
                </div>

                <div className="bg-green-100 text-gray-900 rounded-lg px-4 py-3">
                  <p className="font-semibold">Community Action</p>
                  <p className="text-sm text-gray-700">
                    Amplify your impact through collective initiatives
                  </p>
                </div>
              </div>

              <button className="w-full mt-5 border border-lime-400 text-lime-600 font-semibold py-2 rounded-lg hover:bg-lime-100 transition">
                Explore Advanced Topics
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
