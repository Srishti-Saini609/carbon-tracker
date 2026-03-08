import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivityList = ({ refresh }) => {
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    const res = await axios.get("http://localhost:5000/activities");
    setActivities(res.data);
  };

  // NEW: delete activity function
  const deleteActivity = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/activity/${index}`);
      loadActivities(); // reload activities after delete
    } catch (error) {
      console.error(error);
      alert("Error deleting activity");
    }
  };

  useEffect(() => {
    loadActivities();
  }, [refresh]);

  return (
    <div>
      <h2>Activities</h2>

      {activities.length === 0 ? (
        <p>No activities added yet</p>
      ) : (
        activities.map((a, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            {a.type} - {a.distance} km → {a.carbon} kg CO₂

            {/* NEW DELETE BUTTON */}
            <button
              onClick={() => deleteActivity(i)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityList;