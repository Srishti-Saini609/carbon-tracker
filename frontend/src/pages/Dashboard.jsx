// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Navbar from "../components/Navbar";
// import SummaryCards from "../components/SummaryCards";
// import EmissionsChart from "../components/EmissionsChart";
// import RecentActivities from "../components/RecentActivities";
// import CategoryPie from "../components/CategoryPie";
// import Footer from "../components/Footer";
// import MonthlyTrend from "../components/MonthlyTrend";
// import CategoryInsights from "../components/CategoryInsights";
// import AddActivityModal from "../components/AddActivityModal";
// import DataResourcesModal from "../components/DataResourcesModal";
// import { useEffect } from "react";


// function Dashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showAddActivity, setShowAddActivity] = useState(false);
//   const [showDataResources, setShowDataResources] = useState(false);
//   const navigate = useNavigate(); 
  

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col">
//       <Navbar />

//       <main className="flex-1 p-6">
//         {/* Title */}
//         <h1 className="text-3xl font-semibold text-green-800 mb-2">
//           Your Carbon Dashboard
//         </h1>
//         <p className="text-gray-700 mb-8">
//           Track your environmental impact using real-world emission data and
//           discover opportunities for improvement.
//         </p>

//         <SummaryCards />

//         {/* Tabs */}
//         <div className="flex gap-4 mt-10 border-b border-green-200 pb-2">
//           {["overview", "trends", "categories"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-5 py-2 rounded-t-lg font-medium transition-all duration-300
//               ${
//                 activeTab === tab
//                   ? "bg-green-600 text-white shadow-md scale-105"
//                   : "bg-green-100 text-green-700 hover:bg-green-200"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="mt-8">
//           {activeTab === "overview" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Emissions Chart Section */}
//               <div className="bg-white shadow rounded-xl p-6">
//                 <h3 className="text-lg font-semibold text-green-700 mb-4">
//                   Weekly Emissions
//                 </h3>
//                 <EmissionsChart />
//               </div>

//               {/* Recent Activities Section */}
//               <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold text-green-700 mb-4">
//                     Recent Activities
//                   </h3>
//                   <RecentActivities />
//                 </div>

//                 <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
//                   <button
//                     onClick={() => setShowAddActivity(true)}
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
//                   >
//                     + Add Activity
//                   </button>

//                   {/* View All */}
//                   <button
//                     onClick={() => navigate("/activities")}
//                     className="text-green-700 font-medium hover:underline"
//                   >
//                     View All →
//                   </button>

//                   {/* Data Resources */}
//                   <button
//                     onClick={() => setShowDataResources(true)}
//                     className="text-green-700 font-medium hover:underline"
//                   >
//                     Data Resources 📊
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {showAddActivity && (
//             <AddActivityModal onClose={() => setShowAddActivity(false)} />
//           )}
          
// {showDataResources && (
//   <DataResourcesModal onClose={() => setShowDataResources(false)} />
// )}

//           {activeTab === "trends" && (
//             <div className="bg-white shadow rounded-xl p-6">
//               <MonthlyTrend />
//             </div>
//           )}

//           {activeTab === "categories" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <CategoryPie />
//               <CategoryInsights />
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import EmissionsChart from "../components/EmissionsChart";
import RecentActivities from "../components/RecentActivities";
import CategoryPie from "../components/CategoryPie";
import Footer from "../components/Footer";
import MonthlyTrend from "../components/MonthlyTrend";
import CategoryInsights from "../components/CategoryInsights";
import AddActivityModal from "../components/AddActivityModal";
import DataResourcesModal from "../components/DataResourcesModal";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showDataResources, setShowDataResources] = useState(false);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  // ✅ Step 1: Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to access your dashboard.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Step 2: Fetch user activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/activities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setActivities(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      <main className="flex-1 p-6">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-green-800 mb-2">
          Your Carbon Dashboard
        </h1>
        <p className="text-gray-700 mb-8">
          Track your environmental impact using real-world emission data and
          discover opportunities for improvement.
        </p>

        {/* ✅ Passing data to SummaryCards */}
        <SummaryCards activities={activities} />

        {/* Tabs */}
        <div className="flex gap-4 mt-10 border-b border-green-200 pb-2">
          {["overview", "trends", "categories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-t-lg font-medium transition-all duration-300
              ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Emissions Chart Section */}
              <div className="bg-white shadow rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-4">
                  Weekly Emissions
                </h3>
                <EmissionsChart activities={activities} />
              </div>

              {/* Recent Activities Section */}
              <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Recent Activities
                  </h3>
                  <RecentActivities activities={activities} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
                  <button
                    onClick={() => setShowAddActivity(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    + Add Activity
                  </button>

                  {/* ✅ View All */}
                  <button
                    onClick={() => navigate("/activities")}
                    className="text-green-700 font-medium hover:underline"
                  >
                    View All →
                  </button>

                  {/* ✅ Data Resources */}
                  <button
                    onClick={() => setShowDataResources(true)}
                    className="text-green-700 font-medium hover:underline"
                  >
                    Data Resources 📊
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Modals */}
          {showAddActivity && (
            <AddActivityModal onClose={() => setShowAddActivity(false)} />
          )}
          {showDataResources && (
            <DataResourcesModal onClose={() => setShowDataResources(false)} />
          )}

          {activeTab === "trends" && (
            <div className="bg-white shadow rounded-xl p-6">
              <MonthlyTrend activities={activities} />
            </div>
          )}

          {activeTab === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CategoryPie activities={activities} />
              <CategoryInsights activities={activities} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;

