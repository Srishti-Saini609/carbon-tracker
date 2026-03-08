import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const emissionFactors = {
  car: 0.21,
  bus: 0.11,
  train: 0.04,
  bike: 0,
    kitchen_waste: 0.5,
    meat_waste: 2.5,
    plastic_waste: 3,
    electricity: 0.82,
    veg_meal: 2,
    nonveg_meal: 6
    
};

const CarbonChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:5000/activities");

      const activities = res.data;

      const labels = activities.map((a) => a.type);

      const carbonValues = activities.map((a) => {
        const factor = emissionFactors[a.type] || 0;
        return a.distance * factor;
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Carbon Emission (kg CO₂)",
            data: carbonValues,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });
    };

    loadData();
  }, []);

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h3>Carbon Emission Chart</h3>
      {chartData.labels && <Bar data={chartData} />}
    </div>
  );
};

export default CarbonChart;