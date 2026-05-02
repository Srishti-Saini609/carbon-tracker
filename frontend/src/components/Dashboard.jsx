import { useState } from 'react';
import ChartComponent from './Chart';

const Dashboard = ({ activities, onDelete }) => {
  const [filter, setFilter] = useState('all');
  
  const list = activities || [];
  
  let filtered = [];
  if (filter === 'all') {
    filtered = list;
  } else if (filter === '7days') {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    filtered = list.filter(function(a) {
      if (!a || !a.date) return false;
      return new Date(a.date) >= sevenDaysAgo;
    });
  } else {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    filtered = list.filter(function(a) {
      if (!a || !a.date) return false;
      return new Date(a.date) >= thirtyDaysAgo;
    });
  }

  let total = 0;
  let zeroCount = 0;
  const byType = {};

  for (let i = 0; i < filtered.length; i++) {
    const a = filtered[i];
    const co2e = a.co2e || 0;
    const type = a.type || 'other';
    total += co2e;
    if (co2e === 0) zeroCount++;
    byType[type] = (byType[type] || 0) + co2e;
  }

  let dateLabel = 'All Time';
  if (filter === '7days') {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    dateLabel = d.toLocaleDateString() + ' - Today';
  } else if (filter === '30days') {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    dateLabel = d.toLocaleDateString() + ' - Today';
  }

  const filterBtnClass = (val) =>
    `px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${
      filter === val
        ? 'bg-brand-dark text-white border-brand-dark shadow-md'
        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-dark/40'
    }`;

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } catch {
      // Error handled in parent
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Project Overview */}
      <div className="card bg-gradient-to-br from-brand-mid/10 to-transparent border-brand-mid/20 fade-in-up">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="text-5xl md:text-6xl">🌍</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to CarbonTracker</h2>
            <p className="text-slate-600 leading-relaxed">
              Your personal sustainability companion designed to help you monitor, understand, and reduce your carbon footprint. 
              By tracking daily activities like travel, diet, and energy consumption, we provide actionable insights to help you lead a more eco-friendly life. 
              Together, we can make a difference—one kg of CO₂ at a time.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-dark bg-brand-light/20 px-3 py-1.5 rounded-full">
                🌱 ECO-CONSCIOUS
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                📊 DATA-DRIVEN
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
                🚀 GOAL-ORIENTED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Controls */}
      <div>
      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4 justify-end flex-wrap">
        <button onClick={() => setFilter('all')} className={filterBtnClass('all')}>All Time</button>
        <button onClick={() => setFilter('7days')} className={filterBtnClass('7days')}>Last 7 Days</button>
        <button onClick={() => setFilter('30days')} className={filterBtnClass('30days')}>Last 30 Days</button>
      </div>

      {/* Date Range */}
      <p className="text-right text-sm text-gray-500 mb-4 font-medium">
        📅 {dateLabel} | {filtered.length} activities
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-gradient-to-br from-brand-dark to-brand-light p-5 rounded-2xl text-center text-white shadow-lg fade-in-up stagger-1">
          <h3 className="text-sm opacity-90 mb-2">Total Footprint</h3>
          <p className="text-3xl font-bold">{total.toFixed(2)}</p>
          <p className="text-xs opacity-80 mt-1">kg CO₂e</p>
        </div>
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-5 rounded-2xl text-center text-white shadow-lg fade-in-up stagger-2">
          <h3 className="text-sm opacity-90 mb-2">Activities</h3>
          <p className="text-3xl font-bold">{filtered.length}</p>
          <p className="text-xs opacity-80 mt-1">logged</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-5 rounded-2xl text-center text-white shadow-lg fade-in-up stagger-3">
          <h3 className="text-sm opacity-90 mb-2">Zero-Emission</h3>
          <p className="text-3xl font-bold">{zeroCount}</p>
          <p className="text-xs opacity-80 mt-1">trips</p>
        </div>
      </div>

      {/* Charts & Activity List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card fade-in-up stagger-4">
          <ChartComponent activities={filtered} byType={byType} />
        </div>
        <div className="card fade-in-up stagger-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No activities in this period 🌱</p>
          ) : (
            <div className="max-h-[350px] overflow-y-auto space-y-1">
              {filtered.slice(0, 10).map(function(a) {
                let fDate = 'Unknown';
                if (a && a.date) {
                  const dt = new Date(a.date);
                  if (!isNaN(dt.getTime())) {
                    fDate = dt.toLocaleDateString();
                  }
                }
                
                const actId = a.id || a._id;
                
                return (
                  <div 
                    key={actId} 
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <strong className="text-gray-800 block text-sm capitalize">{(a.category || 'Unknown').replace('_', ' ')}</strong>
                      <p className="text-xs text-gray-500 mt-0.5">{a.value || 0} {a.unit || ''} • {fDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-sm ${(a.co2e || 0) === 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {(a.co2e || 0).toFixed(2)} kg
                      </span>
                      <button 
                        onClick={() => handleDelete(actId)} 
                        disabled={deletingId === actId}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-lg text-xs transition-colors duration-150 disabled:opacity-50"
                        aria-label={`Delete ${(a.category || '').replace('_', ' ')} activity`}
                      >
                        {deletingId === actId ? '...' : '✕'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* About Section Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card fade-in-up">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🌿 Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To empower individuals with the knowledge and tools needed to combat climate change. 
            We believe that awareness is the first step toward significant environmental impact.
          </p>
        </div>
        <div className="card fade-in-up">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🛠️ How it Works</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Log your daily activities using our intuitive meters. Our advanced algorithms calculate 
            your footprint based on global emission factors, helping you identify areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;