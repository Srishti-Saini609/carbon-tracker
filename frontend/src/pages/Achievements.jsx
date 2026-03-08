import React from "react";
import "../App.css";

function Achievements({ activities }) {

  const totalActivities = activities.length;

  const achievements = [

    {
      title: "🌱 First Step",
      description: "Add your first activity",
      unlocked: totalActivities >= 1
    },

    {
      title: "🚶 Eco Beginner",
      description: "Add 5 activities",
      unlocked: totalActivities >= 5
    },

    {
      title: "🌍 Carbon Warrior",
      description: "Add 10 activities",
      unlocked: totalActivities >= 10
    },

    {
      title: "♻️ Eco Master",
      description: "Add 20 activities",
      unlocked: totalActivities >= 20
    }

  ];

  return (
    <div className="achievement-page">

      <h1>🏆 Achievements</h1>

      <div className="achievement-grid">

        {achievements.map((a, index) => (

          <div
            key={index}
            className={
              a.unlocked
                ? "achievement-card unlocked"
                : "achievement-card locked"
            }
          >

            <h3>{a.title}</h3>

            <p>{a.description}</p>

            <span>
              {a.unlocked ? "Unlocked ✅" : "Locked 🔒"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Achievements;