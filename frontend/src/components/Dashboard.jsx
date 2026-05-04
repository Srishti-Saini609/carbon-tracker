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
    `px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
      filter === val
        ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-y-[-1px]'
        : 'bg-white text-gray-500 hover:text-primary hover:bg-gray-50 border border-transparent'
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
    <div className="space-y-12">
      {/* Welcome & Project Overview */}
      <div className="card overflow-hidden relative fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-[2rem] flex items-center justify-center text-5xl md:text-6xl shadow-inner">
            🌍
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-accent-green bg-accent-green/10 px-3 py-1 rounded-full">
                Eco-Conscious
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full">
                Premium Tracking
              </span>
            </div>
            <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">Your Sustainability Overview</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              Monitor, understand, and reduce your carbon footprint with precision. 
              Every action you log contributes to a detailed insight into your environmental impact. 
              Together, we can lead a more eco-friendly life.
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Controls */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight">Performance Metrics</h3>
            <p className="text-sm text-gray-400 font-medium">📅 {dateLabel}</p>
          </div>
          <div className="flex bg-gray-100/50 p-1 rounded-2xl border border-gray-100">
            <button onClick={() => setFilter('all')} className={filterBtnClass('all')}>All Time</button>
            <button onClick={() => setFilter('7days')} className={filterBtnClass('7days')}>7 Days</button>
            <button onClick={() => setFilter('30days')} className={filterBtnClass('30days')}>30 Days</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-primary p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white/50 mb-4">Total Footprint</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-white">{total.toFixed(1)}</p>
              <p className="text-sm font-bold text-white/40">kg CO₂e</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:scale-[1.02] transition-all duration-500">
            <h3 className="text-xs font-black tracking-widest uppercase text-gray-400 mb-4">Activities Logged</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-primary">{filtered.length}</p>
              <p className="text-sm font-bold text-gray-400">entries</p>
            </div>
          </div>

          <div className="bg-accent-gold p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-accent-gold/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xs font-black tracking-widest uppercase text-white/60 mb-4">Zero Emissions</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-white">{zeroCount}</p>
              <p className="text-sm font-bold text-white/50">milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Activity List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card fade-in-up stagger-4">
          <ChartComponent activities={filtered} byType={byType} />
        </div>
        <div className="card fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-primary tracking-tight">Recent Activity</h3>
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded">Last 10 Records</span>
          </div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <span className="text-4xl mb-4 block">🍃</span>
              <p className="text-gray-400 font-medium">No activities recorded yet.</p>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {filtered.slice(0, 10).map(function(a) {
                  let fDate = 'Unknown';
                  if (a && a.date) {
                    const dt = new Date(a.date);
                    if (!isNaN(dt.getTime())) {
                      fDate = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }
                  }
                  
                  const actId = a.id || a._id;
                  
                  return (
                    <div 
                      key={actId} 
                      className="group flex justify-between items-center p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm ${
                          (a.co2e || 0) === 0 ? 'bg-accent-green/10 text-accent-green' : 'bg-red-50 text-red-500'
                        }`}>
                          {a.type === 'transport' ? '🚗' : a.type === 'diet' ? '🍱' : a.type === 'energy' ? '⚡' : '🌱'}
                        </div>
                        <div>
                          <strong className="text-primary block text-sm font-bold capitalize">{(a.category || 'Unknown').replace('_', ' ')}</strong>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">{a.value || 0} {a.unit || ''} • {fDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-black text-sm ${(a.co2e || 0) === 0 ? 'text-accent-green' : 'text-primary'}`}>
                          {(a.co2e || 0).toFixed(2)} <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">kg</span>
                        </span>
                        <button 
                          onClick={() => handleDelete(actId)} 
                          disabled={deletingId === actId}
                          className="w-8 h-8 flex items-center justify-center bg-white text-gray-400 hover:text-red-500 rounded-lg border border-gray-100 hover:border-red-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label={`Delete ${(a.category || '').replace('_', ' ')} activity`}
                        >
                          {deletingId === actId ? '...' : '✕'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="card border-none bg-primary/5 fade-in-up">
          <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">🌿</div>
          <h3 className="text-xl font-black text-primary mb-4 tracking-tight">Our Mission</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            To empower individuals with the knowledge and tools needed to combat climate change. 
            We believe that awareness is the first step toward significant environmental impact.
          </p>
        </div>
        <div className="card border-none bg-accent-gold/5 fade-in-up">
          <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">🛠️</div>
          <h3 className="text-xl font-black text-primary mb-4 tracking-tight">How it Works</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Log your daily activities using our intuitive meters. Our advanced algorithms calculate 
            your footprint based on global emission factors, helping you identify areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;