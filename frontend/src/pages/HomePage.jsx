import React from "react";
import { Button } from "../components/ui/button";
import { Leaf, BarChart, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("You’ve been logged out!");
    navigate("/login");
  };

  return (
    <div className="bg-[#e6f7d9] min-h-screen text-gray-800">
      {/* Navbar */}
      
       {/* <Navbar /> */}
      {/* <nav className="flex justify-between items-center px-10 py-4 bg-[#dff5cf] shadow-sm sticky top-0 z-50"> */}
        {/* <div
          className="flex items-center space-x-2 text-[#1a3c1a] font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Leaf className="w-6 h-6 text-green-700" />
          <span>CarbonTracker</span>
        </div>

        <div className="flex items-center space-x-8"> */}
          {/* <button
            onClick={() => navigate("/")}
            className="text-green-800 font-medium hover:text-green-600"
          >
            Home
          </button> */}

          {/* <button
            onClick={() => navigate("/learn")}
            className="text-green-800 font-medium hover:text-green-600"
          >
            Learn
          </button> */}

         
          {/* {token ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold hover:bg-red-600"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#c5f53b] text-black font-semibold hover:bg-[#b7f03a]"
            >
              Sign In
            </Button>
          )} */}
        {/* </div>
      </nav> */}

      
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-[#0f2d0f] mb-6 leading-tight">
            Track Your <br /> Carbon Impact
          </h1>

          <p className="text-lg mb-6 text-gray-700">
            Monitor your daily activities and discover actionable ways to reduce
            your environmental footprint using real-world emission data from EPA,
            IPCC, and peer-reviewed research.
          </p>

          <div className="flex space-x-4">
            <Button
              onClick={() =>
                token ? navigate("/dashboard") : navigate("/login")
              }
              className="bg-[#c5f53b] text-black font-semibold hover:bg-[#b7f03a]"
            >
              Start Tracking Today
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/learn")}
              className="border-[#c5f53b] text-[#2b4a2b] font-semibold hover:bg-[#e3ffb3]"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="https://img.freepik.com/free-photo/green-footprint-with-earth-background_1232-2111.jpg"
            alt="Eco Globe"
            className="rounded-3xl shadow-lg w-[420px] border-4 border-[#e3ffb3]"
          />
        </div>
      </section>

      
      <section className="px-10 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1a3c1a]">
          Why Choose CarbonTracker?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Leaf className="w-10 h-10 text-green-700" />}
            title="Eco Insights"
            desc="Get personalized suggestions to reduce your carbon emissions and adopt sustainable habits."
          />
          <FeatureCard
            icon={<BarChart className="w-10 h-10 text-green-700" />}
            title="Real-Time Tracking"
            desc="Visualize your carbon impact with detailed charts and analytics based on your activities."
          />
          <FeatureCard
            icon={<UserCheck className="w-10 h-10 text-green-700" />}
            title="Community Impact"
            desc="Join others in your community making conscious choices for a sustainable future."
          />
        </div>
      </section>

      
      <footer className="bg-[#dff5cf] text-center py-6 mt-10 text-gray-700 font-medium">
        © {new Date().getFullYear()} CarbonTracker. All rights reserved.
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#f3fce9] p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#1a3c1a] text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center">{desc}</p>
  </div>
);
