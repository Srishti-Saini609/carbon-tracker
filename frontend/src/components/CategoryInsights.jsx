import React from "react";

const CategoryInsights = () => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold text-green-700 mb-4">
      Category Insights
    </h3>
    <p className="text-gray-600 mb-6">Areas for improvement</p>

    <div className="space-y-4">
      {/* Transport */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
        <h4 className="font-semibold text-red-700 flex items-center gap-2">
          🚗 Transport
          <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded">
            Highest Impact
          </span>
        </h4>
        <p className="text-gray-700 mt-1">
          Consider using public transport or cycling for short trips.
        </p>
      </div>

      {/* Food */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
        <h4 className="font-semibold text-orange-700 flex items-center gap-2">
          🍔 Food
          <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
            Moderate Impact
          </span>
        </h4>
        <p className="text-gray-700 mt-1">
          Try more plant-based meals to reduce your food footprint.
        </p>
      </div>

      {/* Energy */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
        <h4 className="font-semibold text-green-700 flex items-center gap-2">
          ⚡ Energy
          <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
            Good Progress
          </span>
        </h4>
        <p className="text-gray-700 mt-1">
          Great job! Your energy usage is below average.
        </p>
      </div>
    </div>
  </div>
);

export default CategoryInsights;
