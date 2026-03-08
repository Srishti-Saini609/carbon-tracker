import React from "react";

function SustainabilitySuggestions({ activities }) {

  let carCount = 0;
  let meatCount = 0;
  let electricityUsage = 0;

  activities.forEach((activity) => {

    if (activity.type === "car") {
      carCount += activity.distance || 0;
    }

    if (activity.type === "nonveg_meal") {
      meatCount += 1;
    }

    if (activity.type === "electricity") {
      electricityUsage += activity.units || 0;
    }

  });

  const suggestions = [];

  if (carCount > 10) {
    suggestions.push(
      "🚗 Try using public transport or carpooling to reduce travel emissions."
    );
  }

  if (meatCount > 3) {
    suggestions.push(
      "🥗 Consider reducing meat consumption and try more plant-based meals."
    );
  }

  if (electricityUsage > 20) {
    suggestions.push(
      "⚡ Reduce electricity usage by switching off unused appliances."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "🌱 Great job! Your activities show a low carbon footprint."
    );
  }

  return (
    <div className="suggestions-box">

      <h2>🤖 Smart Sustainability Suggestions</h2>

      <ul>
        {suggestions.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>

    </div>
  );
}

export default SustainabilitySuggestions;