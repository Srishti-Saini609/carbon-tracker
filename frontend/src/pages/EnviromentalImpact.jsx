import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Leaf, Globe, Users, Lightbulb } from "lucide-react";

const impactSections = [
  {
    title: "Climate Science",
    description:
      "Understand the scientific foundation of climate change — from greenhouse gases to global temperature rise — and how human activity drives environmental shifts.",
    image:
      "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&w=900&q=60",
    icon: <Globe className="text-green-600" size={28} />,
    points: [
      "Rising global temperatures and melting ice caps",
      "Increased frequency of extreme weather events",
      "Ocean acidification and sea level rise",
    ],
  },
  {
    title: "Individual Impact",
    description:
      "Every small action counts — your daily choices about energy, food, and transport collectively shape our planet’s future.",
    image:
      "https://idealmagazine.co.uk/wp-content/uploads/2020/06/WAYS-YOUR-BUSINESS-CAN-REDUCE-ITS-IMPACT-ON-THE-ENVIRONMENT.png",
    icon: <Users className="text-green-600" size={28} />,
    points: [
      "Transportation and energy use contribute ~70% of individual emissions",
      "Food choices directly influence carbon footprint",
      "Sustainable consumption and waste reduction make measurable impact",
    ],
  },
  {
    title: "Solutions & Innovation",
    description:
      "Explore how technology, renewable energy, and community action are shaping a more sustainable and resilient world.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=60",
    icon: <Lightbulb className="text-green-600" size={28} />,
    points: [
      "Adoption of renewable energy reduces fossil fuel reliance",
      "Carbon capture and reforestation projects gain traction",
      "AI and data help predict and mitigate environmental risks",
    ],
  },
];

export default function EnvironmentalImpact() {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-6">
        <div className="text-center mt-10 mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Environmental Impact
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore how human activity affects our planet — and discover
            innovative solutions to restore balance with nature.
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {section.icon}
                  <h3 className="text-xl font-semibold text-green-800">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-3 text-sm">
                  {section.description}
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
