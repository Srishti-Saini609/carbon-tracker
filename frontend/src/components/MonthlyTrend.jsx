import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", emissions: 180 },
  { month: "Aug", emissions: 165 },
  { month: "Sep", emissions: 145 },
  { month: "Oct", emissions: 130 },
];

const MonthlyTrend = () => (
  <div>
    <h3 className="text-lg font-semibold text-green-700 mb-4">
      Monthly Trend
    </h3>
    <p className="text-gray-600 mb-6">
      Track your progress over time.
    </p>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="emissions"
          stroke="#b7e022"
          strokeWidth={2.5}
          dot={{ r: 6, fill: "#b7e022" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyTrend;
