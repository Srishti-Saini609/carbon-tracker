import React from "react";
import "../App.css";

function Progress({ activities }) {

  const emissionFactors = {
    car: 0.21,
    bus: 0.11,
    train: 0.04,
    electricity: 0.82,
    veg_meal: 2,
    nonveg_meal: 6
  };

  let totalEmission = 0;

  activities.forEach((activity) => {
    const emission =
      (activity.distance || activity.units || 1) *
      (emissionFactors[activity.type] || 0);

    totalEmission += emission;
  });

  const goal = 100;
  const progress = Math.min((totalEmission / goal) * 100, 100);

  return (
    <div className="progress-page">

      <h1>📈 Carbon Progress</h1>

      <div className="progress-card">

        <h3>Total Carbon Emission</h3>

        <p className="emission-number">
          {totalEmission.toFixed(2)} kg CO₂
        </p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <p className="goal-text">
          {progress.toFixed(0)}% of your monthly carbon goal
        </p>

      </div>

    </div>
  );
}

export default Progress;