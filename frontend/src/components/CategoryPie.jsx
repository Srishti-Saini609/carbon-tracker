import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function CategoryPie() {
  const data = [
    { name: "Travel", value: 45 },
    { name: "Electricity", value: 30 },
    { name: "Food", value: 15 },
    { name: "Shopping", value: 10 },
  ];

  const COLORS = ["#86EFAC", "#A7F3D0", "#FDE68A", "#FCA5A5"];

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Emissions by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPie;
