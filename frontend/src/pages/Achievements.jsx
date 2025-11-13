import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award, Leaf, Zap, Trophy, Heart } from "lucide-react";

export default function Achievements() {
  const [implementedTips, setImplementedTips] = useState([]);
  const [carbonSaved, setCarbonSaved] = useState(0);

 
  useEffect(() => {
    const savedTips = JSON.parse(localStorage.getItem("implementedTips")) || [];
    setImplementedTips(savedTips);

    
    const savedCO2 = savedTips.length * 8.5; 
    setCarbonSaved(savedCO2);
  }, []);

  const achievements = [
    {
      id: 1,
      icon: <Leaf className="text-green-600 w-10 h-10" />,
      title: "Eco Beginner",
      description: "Implemented your first sustainable action!",
      unlocked: implementedTips.length >= 1,
    },
    {
      id: 2,
      icon: <Zap className="text-yellow-500 w-10 h-10" />,
      title: "Energy Saver",
      description: "Saved over 30 kg of CO₂ through eco-friendly practices.",
      unlocked: carbonSaved >= 30,
    },
    {
      id: 3,
      icon: <Heart className="text-pink-500 w-10 h-10" />,
      title: "Green Lifestyle",
      description: "Implemented 5 or more sustainability tips.",
      unlocked: implementedTips.length >= 5,
    },
    {
      id: 4,
      icon: <Trophy className="text-orange-500 w-10 h-10" />,
      title: "Eco Champion",
      description: "Reached 100 kg of total CO₂ savings!",
      unlocked: carbonSaved >= 100,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Achievements</h1>
          <p className="text-gray-600 mb-8">
            Celebrate your sustainability milestones and track your journey toward an eco-conscious lifestyle.
          </p>

          {/* Tabs */}
          <div className="flex gap-6 mb-10">
            <button
              onClick={() => (window.location.href = "/insights")}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 font-medium"
            >
              Reduction Tips
            </button>

            <button
              onClick={() => (window.location.href = "/progress")}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 font-medium"
            >
              Your Progress
            </button>

            <button className="px-4 py-2 bg-lime-400 text-gray-900 rounded-md font-medium">
              Achievements
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-3xl font-bold text-green-600">
                {implementedTips.length}
              </h2>
              <p className="text-gray-700 mt-1">Tips Implemented</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-3xl font-bold text-green-600">
                {carbonSaved.toFixed(1)} kg
              </h2>
              <p className="text-gray-700 mt-1">Carbon Saved</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-3xl font-bold text-green-600">
                {achievements.filter((a) => a.unlocked).length}
              </h2>
              <p className="text-gray-700 mt-1">Badges Earned</p>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl p-6 shadow-md border transition transform hover:scale-[1.02] ${
                  a.unlocked
                    ? "bg-green-100 border-green-400"
                    : "bg-gray-100 border-gray-300 opacity-70"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">{a.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{a.description}</p>
                  {a.unlocked ? (
                    <span className="text-green-700 font-medium">
                      ✅ Unlocked
                    </span>
                  ) : (
                    <span className="text-gray-500">🔒 Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next Goal Section */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              🌿 Next Milestone
            </h2>
            <p className="text-gray-700">
              Implement {Math.max(5 - implementedTips.length, 0)} more tips to
              unlock the <span className="font-semibold">Eco Champion</span>{" "}
              badge and reach 100 kg CO₂ saved!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
