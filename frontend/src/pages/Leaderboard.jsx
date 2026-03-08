import React from "react";
import "../App.css";

function Leaderboard({ activities }) {

  const emissionFactors = {
    car: 0.21,
    bus: 0.11,
    train: 0.04,
    electricity: 0.82,
    veg_meal: 2,
    nonveg_meal: 6
  };

  // Calculate current user's emissions
  let userEmission = 0;

  activities.forEach((activity) => {
    const emission =
      (activity.distance || activity.units || 1) *
      (emissionFactors[activity.type] || 0);

    userEmission += emission;
  });

  // Demo users for comparison
  const users = [
    { name: "You", emission: userEmission },
    { name: "Alex", emission: 32 },
    { name: "Priya", emission: 18 },
    { name: "Rahul", emission: 45 },
    { name: "Emma", emission: 25 }
  ];

  // Sort users by lowest emission
  const sortedUsers = users.sort((a, b) => a.emission - b.emission);

  return (
    <div className="page-container">

      <h1 className="page-title">🏆 Carbon Leaderboard</h1>

      <table className="leaderboard-table">

        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>CO₂ Emission (kg)</th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className={user.name === "You" ? "highlight-row" : ""}>

              <td>#{index + 1}</td>

              <td>{user.name}</td>

              <td>{user.emission.toFixed(2)}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Leaderboard;