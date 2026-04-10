import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ChartComponent = ({ activities, byType }) => {
  if (!Array.isArray(activities) || activities.length === 0) {
    return (
      <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '48px', marginBottom: '10px' }}>📊</p>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>No data yet</p>
          <p style={{ fontSize: '14px' }}>Log an activity!</p>
        </div>
      </div>
    );
  }

  const data = byType || {};
  const labels = Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1));
  const values = Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'CO₂e (kg)',
      data: values,
      backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)'],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: 'CO₂e by Type (kg)', font: { size: 14, weight: 'bold' } } },
    scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
  };

  return (
    <div style={{ height: '480px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;