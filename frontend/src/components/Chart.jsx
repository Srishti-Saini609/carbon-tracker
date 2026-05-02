import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ChartComponent = ({ activities, byType }) => {
  if (!Array.isArray(activities) || activities.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center text-gray-400 text-center">
        <div>
          <p className="text-5xl mb-3">📊</p>
          <p className="text-base font-semibold">No data yet</p>
          <p className="text-sm">Log an activity!</p>
        </div>
      </div>
    );
  }

  const data = byType || {};
  const labels = Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1));
  const values = Object.values(data);

  const chartColors = [
    { bg: 'rgba(239, 68, 68, 0.7)', border: 'rgb(239, 68, 68)' },    // red
    { bg: 'rgba(59, 130, 246, 0.7)', border: 'rgb(59, 130, 246)' },   // blue
    { bg: 'rgba(245, 158, 11, 0.7)', border: 'rgb(245, 158, 11)' },   // amber
    { bg: 'rgba(16, 185, 129, 0.7)', border: 'rgb(16, 185, 129)' },   // emerald
  ];

  const chartData = {
    labels,
    datasets: [{
      label: 'CO₂e (kg)',
      data: values,
      backgroundColor: chartColors.map(c => c.bg),
      borderColor: chartColors.map(c => c.border),
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'CO₂e by Type (kg)',
        font: { size: 14, weight: 'bold', family: 'Inter' },
        color: '#374151',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { family: 'Inter' } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', weight: '500' } },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="h-[480px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;