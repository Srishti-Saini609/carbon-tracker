import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const CarbonPieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:5000/activities");

      const activities = res.data;

      let totals = {
        car: 0,
        bus: 0,
        train: 0,
        bike: 0,
         kitchen_waste:0,
  meat_waste:0,
  plastic_waste:0,
  electricity:0,
  veg_meal:0,
  nonveg_meal:0
      };

      activities.forEach((a) => {
        totals[a.type] += a.distance * emissionFactors[a.type];
      });

      setChartData({
        labels: ["Car", "Bus", "Train", "Bike","kitchen_waste","meat_waste","plastic_waste","electricity","veg_meal","nonveg_meal"],
        datasets: [
          {
            data: [
              totals.car,
              totals.bus,
              totals.train,
              totals.bike,
              totals.kitchen_waste,
              totals.meat_waste,
              totals.plastic_waste,
              totals.electricity,
              totals.veg_meal,
              totals.nonveg_meal
            ],
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#4bc0c0",
                "#9966ff",
                "#ff9f40",
                "#c9cbcf",
                "#ff6384",
                "#36a2eb",
                "#ffce56"
            ],
          },
        ],
      });
    };

    loadData();
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h3>Emission Distribution</h3>
      {chartData.labels && <Pie data={chartData} />}
    </div>
  );
};

export default CarbonPieChart;