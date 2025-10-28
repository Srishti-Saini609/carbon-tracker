import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Lightbulb,
  Leaf,
  Car,
  Utensils,
  Zap,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

const tipsData = [
  {
    id: 1,
    title: "Switch to Renewable Energy",
    description:
      "Opt for electricity providers that source their energy from renewable sources like solar or wind, significantly reducing your household's carbon footprint.",
    category: "Electricity",
    impact: "High",
    icon: <Zap className="text-green-600 w-6 h-6" />,
    actionSteps:
      "Research local renewable energy providers; Contact your utility to ask about green energy options; Consider installing solar panels if feasible.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=60",
    link: "https://www.energy.gov/energysaver/renewable-energy",
  },
  {
    id: 2,
    title: "Reduce Meat Consumption",
    description:
      "Livestock farming is a major contributor to greenhouse gas emissions. Reducing your intake of meat, especially red meat, can have a substantial positive impact.",
    category: "Food",
    impact: "High",
    icon: <Utensils className="text-green-600 w-6 h-6" />,
    actionSteps:
      "Try 'Meatless Mondays'; Explore plant-based recipes; Substitute meat with legumes or tofu a few times a week.",
    image:
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1200&q=60",
    link: "https://www.un.org/en/actnow/food",
  },
  {
    id: 3,
    title: "Choose Public Transportation",
    description:
      "Using public transport like buses, trains, or subways instead of personal vehicles drastically cuts down on individual travel emissions.",
    category: "Travel",
    impact: "Medium",
    icon: <Car className="text-green-600 w-6 h-6" />,
    actionSteps:
      "Plan your commute using public transport apps; Purchase a monthly pass; Combine public transport with walking or cycling.",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=60",
    link: "https://www.epa.gov/greenvehicles",
  },
  {
    id: 4,
    title: "Unplug Electronics",
    description:
      "Many electronic devices consume 'phantom load' electricity even when turned off but still plugged in. Unplugging them saves energy.",
    category: "Electricity",
    impact: "Low",
    icon: <Lightbulb className="text-green-600 w-6 h-6" />,
    actionSteps:
      "Unplug chargers when not in use; Use power strips with on/off switches; Educate family members about energy waste.",
    image:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=60",
    link: "https://www.energy.gov/energysaver/articles/identifying-and-unplugging-energy-vampires",
  },
  {
    id: 5,
    title: "Buy Local and Seasonal Food",
    description:
      "Purchasing food grown locally and in season reduces transportation emissions and supports local farmers.",
    category: "Food",
    impact: "Low",
    icon: <Leaf className="text-green-600 w-6 h-6" />,
    actionSteps:
      "Shop at farmers' markets; Check food labels for origin; Grow your own produce if possible.",
    image:
      "https://th.bing.com/th/id/R.8ea31a1c2489785dd31f989bdcb32247?rik=krS7adSt2%2fzcWw&riu=http%3a%2f%2fapparelmagazine.co.nz%2fsupermarketnews%2fwp-content%2fuploads%2fsites%2f2%2f2018%2f11%2flocal-food.jpg&ehk=b33jsYIdfx6UFImO4xdQwg3bDGA1SRf%2bOrWxakfpBkA%3d&risl=&pid=ImgRaw&r=0",
    link: "https://www.un.org/en/actnow/food",
  },
];

export default function Insights() {
  const [category, setCategory] = useState("All Categories");
  const [implementedTips, setImplementedTips] = useState([]);

  // ✅ Load saved implemented tips from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("implementedTips")) || [];
    setImplementedTips(saved);
  }, []);

  // ✅ Save implemented tips when they change
  useEffect(() => {
    localStorage.setItem("implementedTips", JSON.stringify(implementedTips));
  }, [implementedTips]);

  const handleToggleImplement = (id) => {
    if (implementedTips.includes(id)) {
      setImplementedTips(implementedTips.filter((tipId) => tipId !== id));
    } else {
      setImplementedTips([...implementedTips, id]);
    }
  };

  const filteredTips =
    category === "All Categories"
      ? tipsData
      : tipsData.filter((tip) => tip.category === category);

  const categories = ["All Categories", "Electricity", "Food", "Travel"];

  return (
    <>
      <Navbar />
      <div className="bg-green-50 min-h-screen text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Personalized Insights
          </h1>
          <p className="text-gray-600 mb-8">
            Discover actionable tips and track your progress toward a more
            sustainable lifestyle.
          </p>

          {/* Tabs */}
          <div className="flex gap-6 mb-8">
            <button className="px-4 py-2 bg-lime-400 text-gray-900 rounded-md font-medium">
              Reduction Tips
            </button>

            {/* ✅ Linked "Your Progress" Tab */}
            <Link
              to="/progress"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 font-medium"
            >
              Your Progress
            </Link>
            <Link
  to="/achievements"
  className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 font-medium"
>
  Achievements
</Link>


           
          </div>

          {/* Filter */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1 rounded-full border ${
                    category === cat
                      ? "bg-lime-400 border-lime-500 text-gray-900"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className={`rounded-xl shadow-md overflow-hidden border border-gray-200 transition transform hover:scale-[1.01] ${
                  implementedTips.includes(tip.id)
                    ? "bg-green-100 border-green-400"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 p-4 border-b">
                  {tip.icon}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{tip.title}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        tip.impact === "High"
                          ? "bg-red-100 text-red-600"
                          : tip.impact === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {tip.impact} Impact
                    </span>
                  </div>
                  {implementedTips.includes(tip.id) && (
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  )}
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    {tip.description}
                  </p>
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="rounded-lg mb-4 w-full h-48 object-cover"
                  />
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-gray-600" /> Action Steps
                  </h4>
                  <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-md mt-1">
                    {tip.actionSteps}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleToggleImplement(tip.id)}
                      className={`px-4 py-2 rounded-md font-medium transition ${
                        implementedTips.includes(tip.id)
                          ? "bg-green-600 text-white"
                          : "bg-lime-400 hover:bg-lime-500 text-gray-900"
                      }`}
                    >
                      {implementedTips.includes(tip.id)
                        ? "Implemented ✓"
                        : "Mark as Implemented"}
                    </button>

                    {/* ✅ Tooltip Link */}
                    <a
                      href={tip.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group inline-flex items-center"
                    >
                      <ExternalLink className="text-green-600 w-5 h-5 hover:text-green-800 transition" />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs bg-green-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        Learn more
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
