import React, { useState } from "react";

function AddActivityModal({ onClose }) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    date: "",
    distance: "",
    vehicle: "",
    passengers: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Activity Added:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-green-50 p-6 rounded-xl shadow-xl w-full max-w-md relative border border-green-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-green-800 mb-1">
          Add New Activity
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Track your daily activities to monitor your environmental impact
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Activity Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select</option>
              <option value="Transport">Transport</option>
              <option value="Energy">Energy</option>
              <option value="Diet">Diet</option>
              <option value="Recycling">Recycling</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your activity..."
              className="w-full border border-green-300 rounded-lg p-2 h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Distance */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Distance (km)
            </label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              placeholder="0"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Vehicle Type
            </label>
            <select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select vehicle</option>
              <option value="Car">Car</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Bike">Bike</option>
              <option value="Walk">Walk</option>
            </select>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Number of Passengers
            </label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="1"
              placeholder="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Emissions will be divided by number of passengers
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add Activity
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-green-700 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivityModal;
