import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import carbonData from '../assets/data/carbon_emissions.json';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GlobalInsightsPage = () => {
  const countries = Object.keys(carbonData).sort();
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || 'China');
  const [selectedYear, setSelectedYear] = useState(2023);

  const countryData = carbonData[selectedCountry]?.data || [];
  
  // Line Chart Data: Total Emissions over Years
  const lineChartData = useMemo(() => {
    const years = [...new Set(countryData.map(d => d.year))].sort();
    const totals = years.map(year => {
      return countryData
        .filter(d => d.year === year)
        .reduce((sum, d) => sum + d.emissions, 0);
    });

    return {
      labels: years,
      datasets: [
        {
          label: 'Total CO2 Emissions (Metric Tons)',
          data: totals,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [selectedCountry, countryData]);

  // Pie Chart Data: Sector breakdown for selected year
  const pieChartData = useMemo(() => {
    const yearData = countryData.filter(d => d.year === selectedYear);
    const sectors = yearData.map(d => d.sector);
    const percentages = yearData.map(d => d.percentage);

    return {
      labels: sectors,
      datasets: [
        {
          data: percentages,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [selectedCountry, selectedYear, countryData]);

  // Bar Chart Data: Top 10 Countries by Per Capita in Selected Year
  const barChartData = useMemo(() => {
    const allCountryData = Object.entries(carbonData).map(([name, info]) => {
      const yearInfo = info.data.find(d => d.year === selectedYear);
      return {
        name,
        perCapita: yearInfo ? yearInfo.perCapita : 0
      };
    });

    const top10 = allCountryData
      .sort((a, b) => b.perCapita - a.perCapita)
      .slice(0, 10);

    return {
      labels: top10.map(d => d.name),
      datasets: [
        {
          label: `Per Capita Emissions in ${selectedYear} (Metric Tons / Person)`,
          data: top10.map(d => d.perCapita),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [selectedYear]);

  return (
    <div className="pb-12 pt-6">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-enter">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">🌍 Global Carbon Insights</h1>
          <p className="text-slate-600 max-w-2xl">Explore emissions data and trends across 50+ countries from 2000 to 2025.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="card flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Country</label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input-field py-2"
            >
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="card flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Year</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field py-2"
            >
              {[...Array(26)].map((_, i) => (
                <option key={2000 + i} value={2000 + i}>{2000 + i}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 bg-gradient-to-br from-brand-dark to-brand-mid p-8 rounded-3xl text-white shadow-xl flex items-center justify-between hover:scale-[1.02] transition-transform duration-300">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{selectedCountry} ({selectedYear})</p>
              <h3 className="text-4xl font-extrabold pulse-glow">
                {countryData.find(d => d.year === selectedYear)?.perCapita.toFixed(2)} 
                <span className="text-lg font-normal ml-2 opacity-80">tons/capita</span>
              </h3>
            </div>
            <div className="text-5xl drop-shadow-lg">🌿</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <div className="card p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Total Emission Trend: {selectedCountry}</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: false } }
                }} 
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🍕 Sector Breakdown ({selectedYear})</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Pie 
                data={pieChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Top 10 Countries by Per Capita Emissions ({selectedYear})</h3>
          <div className="h-[400px]">
            <Bar 
              data={barChartData} 
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true } }
              }} 
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="text-blue-800 font-bold mb-2">💡 About this Data</h4>
          <p className="text-blue-700 text-sm">
            This dataset provides a comprehensive overview of global carbon emissions across multiple sectors including Energy, Transportation, Agriculture, Industry, Waste Management, and Residential usage. Data is synthesized based on realistic global trends and international reporting standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalInsightsPage;
