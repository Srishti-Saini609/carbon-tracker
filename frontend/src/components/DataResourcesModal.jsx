import React, { useState } from "react";

function DataResourcesModal({ onClose }) {
  const dataset = [
    { id: 1, category: "Travel", activity: "Bus ride", emissions: 2.4, date: "2025-10-10" },
    { id: 2, category: "Food", activity: "Vegetarian meal", emissions: 1.2, date: "2025-10-11" },
    { id: 3, category: "Electricity", activity: "Home usage", emissions: 3.8, date: "2025-10-12" },
    { id: 4, category: "Shopping", activity: "Clothes purchase", emissions: 1.5, date: "2025-10-13" },
    { id: 5, category: "Travel", activity: "Car trip", emissions: 5.7, date: "2025-10-14" },
    { id: 6, category: "Food", activity: "Non-veg meal", emissions: 3.2, date: "2025-10-15" },
    { id: 7, category: "Electricity", activity: "Office usage", emissions: 4.5, date: "2025-10-16" },
    { id: 8, category: "Shopping", activity: "Electronics", emissions: 6.2, date: "2025-10-17" },
    { id: 9, category: "Travel", activity: "Flight", emissions: 25.3, date: "2025-10-18" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = dataset.filter(
    (item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmissions = filteredData
    .reduce((sum, item) => sum + item.emissions, 0)
    .toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 max-h-[90vh] overflow-hidden flex flex-col border border-green-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-700">📊 Data Resources</h2>
          <button
            onClick={onClose}
            className="text-green-700 font-bold text-xl hover:text-red-600 transition"
          >
            ✖
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search by category or activity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Scrollable Table */}
        <div className="flex-grow overflow-y-auto border rounded-xl shadow-inner">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-green-600 text-white sticky top-0 shadow">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Activity</th>
                <th className="py-3 px-4">CO₂ (kg)</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    } hover:bg-green-100 hover:scale-[1.01]`}
                  >
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4 font-medium text-green-800">{item.category}</td>
                    <td className="py-3 px-4">{item.activity}</td>
                    <td className="py-3 px-4">{item.emissions}</td>
                    <td className="py-3 px-4">{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No results found 🌿
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="mt-4 bg-green-100 p-3 rounded-lg text-green-900 font-medium shadow-sm text-right">
          🌱 <span className="font-semibold">Total CO₂ Emissions:</span> {totalEmissions} kg
        </div>
      </div>
    </div>
  );
}

export default DataResourcesModal;
