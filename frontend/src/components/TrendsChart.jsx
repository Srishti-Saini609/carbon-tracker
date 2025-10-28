import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TrendsChart = () => {
  // Mock data (replace later with MongoDB data)
  const data = [
    { month: "Jan", emissions: 320 },
    { month: "Feb", emissions: 280 },
    { month: "Mar", emissions: 340 },
    { month: "Apr", emissions: 300 },
    { month: "May", emissions: 260 },
    { month: "Jun", emissions: 290 },
    { month: "Jul", emissions: 310 },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4">
        Monthly Emission Trends
      </h3>
      <p className="text-gray-600 mb-4">
        Track your CO₂ emissions across different months to measure your
        environmental performance.
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#15803d" />
          <YAxis stroke="#15803d" />
          <Tooltip
            formatter={(value) => [`${value} kg CO₂`, "Emissions"]}
            labelStyle={{ color: "#15803d" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="emissions"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 5, fill: "#22c55e" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
