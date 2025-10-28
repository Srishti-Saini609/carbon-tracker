import React from "react";

const activities = [
  { id: 1, title: "Biked to work", date: "Oct 20, 2025", impact: "-1.2 kg CO₂" },
  { id: 2, title: "Used public transport", date: "Oct 18, 2025", impact: "-0.8 kg CO₂" },
  { id: 3, title: "Recycled household waste", date: "Oct 16, 2025", impact: "-0.5 kg CO₂" },
];

function RecentActivities() {
  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="flex justify-between items-center bg-green-50 hover:bg-green-100 p-3 rounded-lg transition"
        >
          <div>
            <h4 className="font-semibold text-green-800">{activity.title}</h4>
            <p className="text-gray-600 text-sm">{activity.date}</p>
          </div>
          <span className="text-green-700 font-medium">{activity.impact}</span>
        </li>
      ))}
    </ul>
  );
}

export default RecentActivities;
