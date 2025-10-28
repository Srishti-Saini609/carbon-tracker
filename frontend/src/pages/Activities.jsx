import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddActivityModal from "../components/AddActivityModal";
import { FaCar, FaDrumstickBite, FaBolt, FaBus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const Activities = () => {
  // Load from localStorage initially
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("activities");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Car commute to work (medium gasoline car)",
        date: "2024-10-19",
        distance: "25 km",
        tags: ["car", "gasoline", "medium"],
        source: "EPA 2023",
        emission: 4.8,
        icon: "car",
      },
      {
        id: 2,
        name: "Beef lunch at restaurant",
        date: "2024-10-19",
        tags: ["high meat", "beef"],
        source: "Poore & Nemecek 2018",
        emission: 7.3,
        icon: "food",
      },
      {
        id: 3,
        name: "Home electricity usage (US grid)",
        date: "2024-10-18",
        tags: ["EPA eGRID 2023"],
        source: "EPA eGRID 2023",
        emission: 5.8,
        icon: "electric",
      },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editActivity, setEditActivity] = useState(null);

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const getIcon = (iconType) => {
    switch (iconType) {
      case "car":
        return <FaCar className="text-red-500 text-xl" />;
      case "food":
        return <FaDrumstickBite className="text-orange-500 text-xl" />;
      case "electric":
        return <FaBolt className="text-blue-500 text-xl" />;
      case "bus":
        return <FaBus className="text-green-500 text-xl" />;
      default:
        return <FaBolt className="text-gray-500 text-xl" />;
    }
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleSave = (newActivity) => {
    if (editActivity) {
      // Edit existing
      setActivities(
        activities.map((a) =>
          a.id === editActivity.id ? { ...newActivity, id: a.id } : a
        )
      );
      setEditActivity(null);
    } else {
      // Add new
      setActivities([
        ...activities,
        { ...newActivity, id: Date.now(), icon: newActivity.icon || "car" },
      ]);
    }
    setShowModal(false);
  };

  const totalEmissions = activities.reduce((sum, a) => sum + a.emission, 0);
  const avgDaily = (activities.length > 0
    ? (totalEmissions / activities.length).toFixed(1)
    : 0);

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-1 px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-green-800">
              Activity Tracker
            </h1>
            <p className="text-gray-700 mt-1">
              Log your daily activities to monitor your carbon footprint using
              real-world emission data.
            </p>
          </div>
          <button
            onClick={() => {
              setEditActivity(null);
              setShowModal(true);
            }}
            className="bg-lime-500 hover:bg-lime-600 text-white font-medium px-5 py-2 rounded-lg shadow"
          >
            + Add Activity
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-600 font-medium">Total Activities</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {activities.length}
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-600 font-medium">Total Emissions</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {totalEmissions.toFixed(1)} <span className="text-base">kg CO₂</span>
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-600 font-medium">Average Daily</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {avgDaily} <span className="text-base">kg CO₂</span>
            </p>
          </div>
        </div>

        {/* Activity List */}
        <section>
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Recent Activities
          </h2>
          {activities.length === 0 ? (
            <p className="text-gray-600 italic">No activities logged yet.</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center bg-green-100 p-4 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    {getIcon(activity.icon)}
                    <div>
                      <h3 className="font-semibold text-green-900">
                        {activity.name}
                      </h3>
                      <div className="text-sm text-gray-600 flex gap-3 mt-1 flex-wrap">
                        <span>📅 {activity.date}</span>
                        {activity.distance && <span>{activity.distance}</span>}
                        {activity.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-green-200 text-green-800 px-2 py-0.5 rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-gray-500">• {activity.source}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-green-800 font-bold">
                      {activity.emission} <span className="text-sm">kg CO₂</span>
                    </p>
                    <button
                      onClick={() => {
                        setEditActivity(activity);
                        setShowModal(true);
                      }}
                      className="text-green-800 hover:text-green-600"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add/Edit Modal */}
        {showModal && (
          <AddActivityModal
            onClose={() => {
              setShowModal(false);
              setEditActivity(null);
            }}
            onSave={handleSave}
            editData={editActivity}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Activities;
