import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Leaf, Search, ExternalLink } from "lucide-react";

const categories = ["All", "Electricity", "Food", "Travel", "General", "Water"];
const tabs = ["Reduction Tips", "Guides", "Environmental Impact"];

const learnData = [
  {
    id: 1,
    title: "Switch to Renewable Energy",
    category: "Electricity",
    impact: "High Impact",
    description:
      "Opt for electricity providers that source their energy from renewable sources like solar or wind, significantly reducing your household’s carbon footprint.",
    quickActions:
      "Research local renewable energy providers; Contact your utility to ask about green energy options; Install solar panels if possible.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=60",
    link: "https://www.epa.gov/greenpower",
  },
  {
    id: 2,
    title: "Reduce Meat Consumption",
    category: "Food",
    impact: "High Impact",
    description:
      "Livestock farming contributes heavily to greenhouse gas emissions. Reducing your intake of red meat can have a substantial positive impact.",
    quickActions:
      "Try 'Meatless Mondays'; Explore plant-based recipes; Substitute meat with legumes.",
    image:
      "https://thumbs.dreamstime.com/b/visual-representation-how-reducing-meat-consumption-one-day-week-can-have-significant-impact-greenhouse-gas-emissions-316713901.jpg",
    link: "https://drawdown.org/explorer#redirect",
  },
  {
    id: 3,
    title: "Choose Public Transportation",
    category: "Travel",
    impact: "Medium Impact",
    description:
      "Using public transport instead of a personal car can drastically cut down travel emissions.",
    quickActions:
      "Plan your commute using public transport apps; Purchase a monthly pass; Combine with walking or cycling.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=60",
    link: "https://www.itf-oecd.org/public-transport-climate-change",
  },
  {
    id: 4,
    title: "Unplug Electronics",
    category: "Electricity",
    impact: "Low Impact",
    description:
      "Devices consume 'phantom load' even when off. Unplugging them saves energy.",
    quickActions:
      "Unplug chargers when not in use; Use power strips; Educate family members.",
    image:
      "https://img.freepik.com/premium-vector/saving-energy-tips-unplug-appliances-when-use-switch-off-lights_183665-912.jpg?w=826",
    link: "https://www.energy.gov/energysaver/phantom-loads",
  },
  {
    id: 5,
    title: "Use LED Bulbs",
    category: "Electricity",
    impact: "Medium Impact",
    description:
      "LEDs use up to 85% less energy than traditional bulbs and last longer.",
    quickActions:
      "Replace old bulbs with LEDs; Look for Energy Star certification; Recycle old bulbs properly.",
    image:
      "https://wyattdowling.ca/get/files/image/galleries/Led_Light_Blog_Image_1200x630.jpg",
    link: "https://www.energy.gov/energysaver/led-lighting",
  },
  {
    id: 6,
    title: "Compost Organic Waste",
    category: "Food",
    impact: "Medium Impact",
    description:
      "Composting reduces landfill waste and creates nutrient-rich soil for gardens.",
    quickActions:
      "Set up a compost bin; Avoid meat and dairy in compost; Educate your community about composting.",
    image:
      "https://green.org/wp-content/uploads/2024/01/a-Sustainable-Way-to-Manage-Organic-Waste.jpg",
    link: "https://www.epa.gov/recycle/composting-home",
  },
  {
    id: 7,
    title: "Carry a Reusable Water Bottle",
    category: "General",
    impact: "Low Impact",
    description:
      "Single-use plastic bottles create massive waste. Reusable bottles reduce plastic pollution.",
    quickActions:
      "Buy a stainless steel or BPA-free bottle; Fill from filtered sources; Encourage others to stop using disposable bottles.",
    image:
      "https://bebottle.com/wp-content/uploads/2020/02/water-bottles-be-bottle-v3.jpg",
    link: "https://www.epa.gov/recycle/reducing-and-reusing-basics",
  },
  {
    id: 8,
    title: "Fix Water Leaks",
    category: "Water",
    impact: "Medium Impact",
    description:
      "A dripping faucet can waste gallons of water daily. Fixing leaks saves water and money.",
    quickActions:
      "Inspect taps and pipes regularly; Use water-saving fixtures; Report leaks in public areas.",
    image:
      "https://www.ciwem.org/assets/uploads/assets/uploads/shutterstock_11236013363.png",
    link: "https://www.wikihow.com/Fix-Leaking-Pipes",
  },
  {
    id: 9,
    title: "Buy Local Produce",
    category: "Food",
    impact: "Medium Impact",
    description:
      "Local foods travel shorter distances, cutting transport emissions and supporting farmers.",
    quickActions:
      "Visit farmers’ markets; Support farm-to-table restaurants; Avoid heavily packaged imports.",
    image:
      "https://apparelmagazine.co.nz/supermarketnews/wp-content/uploads/sites/2/2018/11/local-food.jpg",
    link: "https://www.un.org/en/actnow/food",
  },
  {
    id: 10,
    title: "Use Cold Water for Laundry",
    category: "Electricity",
    impact: "Low Impact",
    description:
      "Washing clothes in cold water saves energy and helps garments last longer.",
    quickActions:
      "Switch your machine setting to cold; Wash full loads; Air dry when possible.",
    image:
      "https://thumbs.dreamstime.com/b/energy-saving-concept-using-cold-water-to-wash-clothes-washing-machine-mode-268727624.jpg",
    link: "https://www.energy.gov/energysaver/programmable-thermostats?nrg_redirect=467167",
  },
  {
    id: 11,
    title: "Plant Trees",
    category: "General",
    impact: "High Impact",
    description:
      "Trees absorb carbon dioxide and provide oxygen, shade, and improved air quality.",
    quickActions:
      "Join community planting drives; Plant native species; Care for saplings regularly.",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=800&q=60",
    link: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  },
  {
    id: 12,
    title: "Switch to Energy-Efficient Appliances",
    category: "Electricity",
    impact: "High Impact",
    description:
      "Appliances with higher energy ratings consume less electricity, saving both money and emissions.",
    quickActions:
      "Look for 5-star rated products; Replace old appliances; Use energy-saving modes.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.nqbRSAIUIMKkU5A_IR-ssQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    link: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  },
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState("Reduction Tips");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredData = learnData.filter(
    (item) =>
      (activeCategory === "All" || item.category === activeCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-6">
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Learn Sustainability
          </h1>
          <p className="text-gray-700 mb-6">
            Discover strategies to reduce your environmental impact and make
            lasting change.
          </p>

          {/* Search */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search sustainability topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-2 pl-9 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "Guides") navigate("/learn/guides");
                  if (tab === "Environmental Impact")
                    navigate("/learn/environmental-impact");
                }}
                className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 rounded-lg border text-sm font-medium ${
                activeCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-sm text-green-700 font-medium mb-1">
                  Impact: {item.impact}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Quick Actions: {item.quickActions}
                </p>

                {/* Learn More button */}
                <Link
                  to={item.link}
                  className="w-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                >
                  Learn More
                  <ExternalLink className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
