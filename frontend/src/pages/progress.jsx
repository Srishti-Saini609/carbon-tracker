import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Zap, Leaf, Trophy } from "lucide-react";

export default function Progress() {
  const [implementedTips, setImplementedTips] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("implementedTips")) || [];
    setImplementedTips(saved);
  }, []);

  const totalTips = 5;
  const completed = implementedTips.length;
  const completionRate = Math.round((completed / totalTips) * 100);

  // Simple scoring by impact
  const calculateImpactScore = () => {
    const impactWeights = { High: 3, Medium: 2, Low: 1 };
    const tips = [
      { id: 1, impact: "High" },
      { id: 2, impact: "High" },
      { id: 3, impact: "Medium" },
      { id: 4, impact: "Low" },
      { id: 5, impact: "Low" },
    ];

    return tips
      .filter((tip) => implementedTips.includes(tip.id))
      .reduce((acc, tip) => acc + impactWeights[tip.impact], 0);
  };

  const impactScore = calculateImpactScore();

  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Your Progress</h1>
          <p className="text-gray-600 mb-8">
            Track your sustainability journey and celebrate your impact.
          </p>

          {/* Tabs Navigation */}
          <div className="flex gap-6 mb-10">
            <button
              onClick={() => (window.location.href = "/insights")}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 font-medium"
            >
              Reduction Tips
            </button>

            <button className="px-4 py-2 bg-lime-400 text-gray-900 rounded-md font-medium">
              Your Progress
            </button>

            <button
              onClick={() => (window.location.href = "/achievements")}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 font-medium"
            >
              Achievements
            </button>
          </div>

          {/* Progress Overview */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Zap className="text-green-600" /> Progress Overview
            </h2>

            <p className="text-gray-600 mb-4">
              You’ve implemented <strong>{completed}</strong> out of{" "}
              <strong>{totalTips}</strong> sustainable tips.
            </p>

            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="h-4 bg-lime-400 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>

            <p className="mt-2 text-gray-600 text-sm">{completionRate}% Completed</p>
          </div>

          {/* Impact Summary Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">Tips Implemented</h3>
                <CheckCircle className="text-green-600 w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-green-700">{completed}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">Impact Score</h3>
                <Leaf className="text-green-600 w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-green-700">{impactScore}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">Next Milestone</h3>
                <Trophy className="text-yellow-500 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600">
                Implement <strong>{Math.max(0, 3 - completed)}</strong> more tips to
                unlock your next badge!
              </p>
            </div>
          </div>

          {/* Milestone Card */}
          <div className="bg-gradient-to-r from-green-200 to-lime-300 rounded-xl p-8 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🌿 Keep Going!
            </h3>
            <p className="text-gray-700 mb-4">
              Every small change counts. Continue implementing eco-friendly tips to
              reach your sustainability goals.
            </p>
            <button
              onClick={() => (window.location.href = "/insights")}
              className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-800 transition"
            >
              Explore More Tips
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
