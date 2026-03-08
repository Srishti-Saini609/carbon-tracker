import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function ActivityForm({ fetchActivities }) {

  const [formData, setFormData] = useState({
    type: "",
    distance: "",
    date: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitActivity = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/activity", formData);

    fetchActivities();

    setFormData({
      type: "",
      distance: "",
      date: ""
    });
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h2>➕ Add Activity</h2>

        <form onSubmit={submitActivity}>

          <label>Activity Type</label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Activity</option>
            <option value="car">🚗 Car Travel</option>
            <option value="bus">🚌 Bus Travel</option>
            <option value="train">🚆 Train Travel</option>
            <option value="electricity">⚡ Electricity</option>
            <option value="veg_meal">🥗 Veg Meal</option>
            <option value="nonveg_meal">🍗 Non-Veg Meal</option>
          </select>

          <label>Distance / Units</label>

          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Enter km or units"
            required
          />

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Activity
          </button>

        </form>

      </div>

    </div>
  );
}

export default ActivityForm;