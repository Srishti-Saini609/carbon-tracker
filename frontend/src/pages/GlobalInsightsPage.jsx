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
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 page-enter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">Global Emissions Data</h1>
            <p className="text-gray-500 font-medium max-w-2xl">Exploring industrial trends and carbon output across 50+ nations from 2000 to 2025.</p>
          </div>
          <div className="flex bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white shadow-sm">
            <div className="px-4 py-2 text-xs font-bold text-accent-gold bg-accent-gold/10 rounded-xl uppercase tracking-widest">Global Analytics</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="card flex flex-col gap-3 py-6 px-8 border-none bg-white/40 shadow-sm">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Select Country</label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent border-none text-primary font-black text-lg focus:ring-0 cursor-pointer outline-none"
            >
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="card flex flex-col gap-3 py-6 px-8 border-none bg-white/40 shadow-sm">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Timeline Year</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-transparent border-none text-primary font-black text-lg focus:ring-0 cursor-pointer outline-none"
            >
              {[...Array(26)].map((_, i) => (
                <option key={2000 + i} value={2000 + i}>{2000 + i}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/20 flex items-center justify-between relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{selectedCountry} ({selectedYear})</p>
              <h3 className="text-5xl font-black tracking-tight">
                {countryData.find(d => d.year === selectedYear)?.perCapita.toFixed(2)} 
                <span className="text-lg font-bold ml-2 text-white/30 tracking-normal">tons/capita</span>
              </h3>
            </div>
            <div className="text-6xl relative z-10 group-hover:rotate-12 transition-transform duration-500">🌿</div>
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
