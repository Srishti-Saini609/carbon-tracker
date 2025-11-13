// import React from "react";

// function Navbar() {
//   return (
//     <nav className="bg-green-100 shadow-sm p-4 flex justify-between items-center">
//       <h2 className="text-xl font-bold text-green-700">CarbonTracker</h2>
//       <div className="flex gap-6 text-gray-700">
//         <a href="/dashboard" className="hover:text-green-600">Dashboard</a>
//         <a href="/activities" className="hover:text-green-600">Activities</a>
//         <a href="/insights" className="hover:text-green-600">Insights</a>
//         <a href="/learn" className="hover:text-green-600">Learn</a>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// src/components/Navbar.jsx
import React from "react";
import { Button } from "./ui/button";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You’ve been logged out!");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-[#dff5cf] shadow-sm sticky top-0 z-50">
      <div
        className="flex items-center space-x-2 text-[#1a3c1a] font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Leaf className="w-6 h-6 text-green-700" />
        <span>CarbonTracker</span>
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={() => navigate("/homepage")}
          className="text-green-800 font-medium hover:text-green-600"
        >
          HomePage
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-green-800 font-medium hover:text-green-600"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/activities")}
          className="text-green-800 font-medium hover:text-green-600"
        >
          Activities
        </button>

        <button
          onClick={() => navigate("/learn")}
          className="text-green-800 font-medium hover:text-green-600"
        >
          Learn
        </button>

        <button
          onClick={() => navigate("/insights")}
          className="text-green-800 font-medium hover:text-green-600"
        >
          Insights
        </button>

        {token ? (
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
        )}
      </div>
    </nav>
  );
}
