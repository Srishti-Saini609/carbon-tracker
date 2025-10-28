import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", emissions: 2.3 },
  { day: "Tue", emissions: 2.8 },
  { day: "Wed", emissions: 2.1 },
  { day: "Thu", emissions: 3.0 },
  { day: "Fri", emissions: 1.9 },
  { day: "Sat", emissions: 2.5 },
  { day: "Sun", emissions: 2.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-green-200 p-2 rounded-md shadow text-sm">
        <p className="text-green-700 font-semibold">{label}</p>
        <p>{payload[0].value} kg CO₂</p>
      </div>
    );
  }
  return null;
};

const EmissionsChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="emissions" fill="#16a34a" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default EmissionsChart;
