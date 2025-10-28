import React from "react";

function Navbar() {
  return (
    <nav className="bg-green-100 shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-green-700">CarbonTracker</h2>
      <div className="flex gap-6 text-gray-700">
        <a href="/dashboard" className="hover:text-green-600">Dashboard</a>
        <a href="/activities" className="hover:text-green-600">Activities</a>
        <a href="/insights" className="hover:text-green-600">Insights</a>
        <a href="/learn" className="hover:text-green-600">Learn</a>
      </div>
    </nav>
  );
}

export default Navbar;
