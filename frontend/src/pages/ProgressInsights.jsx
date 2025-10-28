import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TrendingUp, Target, Award, Leaf } from "lucide-react";

const ProgressInsights = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Your Progress
        </h1>
        <p className="text-gray-600 mb-8">
          Track your achievements and see how your actions contribute to a
          greener planet.
        </p>

        {/* Top Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Tips Viewed</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">12</p>
            <p className="text-gray-400 text-sm">Total</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Tips Implemented</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">5</p>
            <p className="text-gray-400 text-sm">Actions taken</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Carbon Saved</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">45.2</p>
            <p className="text-gray-400 text-sm">kg CO₂</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Current Streak</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">7</p>
            <p className="text-gray-400 text-sm">Days</p>
          </div>
        </div>

        {/* Implementation Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Implementation Progress
            </h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Tips Implemented</p>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-lime-400 h-3 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">5 / 12</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Carbon Reduction Goal
              </p>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-lime-400 h-3 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">45.2 / 100 kg</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <p className="text-green-800 text-sm font-medium flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Next Milestone
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Implement 5 more tips to reach the “Eco Champion” level and
                unlock exclusive content!
              </p>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Impact Summary
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">45.2</p>
                <p className="text-sm text-gray-500">kg CO₂ Saved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">12</p>
                <p className="text-sm text-gray-500">Trees Equivalent</p>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p className="flex justify-between">
                <span>Transport improvements</span>
                <span className="text-green-700">-25 kg CO₂</span>
              </p>
              <p className="flex justify-between">
                <span>Energy efficiency</span>
                <span className="text-green-700">-15 kg CO₂</span>
              </p>
              <p className="flex justify-between">
                <span>Food choices</span>
                <span className="text-green-700">-5.2 kg CO₂</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgressInsights;
