import React from "react";

function SummaryCards() {
  const data = {
    today: 0.0,
    total: 20.0,
    trend: -15,
    activities: 5,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="text-gray-500">Today's Emissions</p>
        <h3 className="text-2xl font-bold">{data.today} kg</h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="text-gray-500">Total Tracked</p>
        <h3 className="text-2xl font-bold">{data.total} kg</h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="text-gray-500">Monthly Trend</p>
        <h3 className="text-2xl font-bold text-green-600">{data.trend}%</h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="text-gray-500">Activities</p>
        <h3 className="text-2xl font-bold">{data.activities}</h3>
      </div>
    </div>
  );
}

export default SummaryCards;
