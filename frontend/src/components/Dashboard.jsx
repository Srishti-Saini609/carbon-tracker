import { useState } from 'react';
import ChartComponent from './Chart';

const Dashboard = ({ activities, onDelete }) => {
  const [filter, setFilter] = useState('all');
  
  const list = activities || [];
  
  // Simple filter logic
  let filtered = [];
  if (filter === 'all') {
    filtered = list;
  } else if (filter === '7days') {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    filtered = list.filter(function(a) {
      if (!a || !a.date) return false;
      const actDate = new Date(a.date);
      return actDate >= sevenDaysAgo;
    });
  } else {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    filtered = list.filter(function(a) {
      if (!a || !a.date) return false;
      const actDate = new Date(a.date);
      return actDate >= thirtyDaysAgo;
    });
  }

  // Calculate totals
  let total = 0;
  let zeroCount = 0;
  const byType = {};

  for (let i = 0; i < filtered.length; i++) {
    const a = filtered[i];
    const co2e = a.co2e || 0;
    const type = a.type || 'other';
    
    total = total + co2e;
    if (co2e === 0) zeroCount = zeroCount + 1;
    byType[type] = (byType[type] || 0) + co2e;
  }

  // Date range label
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

  return (
    <div>
      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{
            background: filter === 'all' ? '#134e5e' : '#fff',
            color: filter === 'all' ? '#fff' : '#333',
            border: '2px solid #134e5e',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          All Time
        </button>
        <button 
          onClick={() => setFilter('7days')} 
          style={{
            background: filter === '7days' ? '#134e5e' : '#fff',
            color: filter === '7days' ? '#fff' : '#333',
            border: '2px solid #134e5e',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Last 7 Days
        </button>
        <button 
          onClick={() => setFilter('30days')} 
          style={{
            background: filter === '30days' ? '#134e5e' : '#fff',
            color: filter === '30days' ? '#fff' : '#333',
            border: '2px solid #134e5e',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Last 30 Days
        </button>
      </div>

      {/* Date Range Display */}
      <p style={{ 
        textAlign: 'right', 
        color: 'white', 
        fontSize: '13px', 
        marginBottom: '15px',
        fontWeight: '600',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}>
        📅 {dateLabel} | {filtered.length} activities
      </p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#134e5e', fontSize: '14px', marginBottom: '10px' }}>Total Footprint</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', color: '#333', margin: 0 }}>{total.toFixed(2)}</p>
          <p style={{ fontSize: '12px', color: '#999', margin: '5px 0 0' }}>kg CO₂e</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#f39c12', fontSize: '14px', marginBottom: '10px' }}>Activities</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', color: '#333', margin: 0 }}>{filtered.length}</p>
          <p style={{ fontSize: '12px', color: '#999', margin: '5px 0 0' }}>logged</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#27ae60', fontSize: '14px', marginBottom: '10px' }}>Zero-Emission</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', color: '#333', margin: 0 }}>{zeroCount}</p>
          <p style={{ fontSize: '12px', color: '#999', margin: '5px 0 0' }}>trips</p>
        </div>
      </div>

      {/* Charts & List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <ChartComponent activities={filtered} byType={byType} />
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: '#333', fontSize: '18px' }}>Recent Activities</h3>
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No activities in this period 🌱</p>
          ) : (
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {filtered.slice(0, 10).map(function(a) {
                let fDate = 'Unknown';
                if (a && a.date) {
                  const dt = new Date(a.date);
                  if (!isNaN(dt.getTime())) {
                    fDate = dt.toLocaleDateString();
                  }
                }
                
                return (
                  <div 
                    key={a.id} 
                    style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#333', display: 'block', marginBottom: '4px' }}>{a.category || 'Unknown'}</strong>
                      <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>{a.value || 0} {a.unit || ''} • {fDate}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '600', color: (a.co2e || 0) === 0 ? '#27ae60' : '#e74c3c', fontSize: '14px' }}>
                        {(a.co2e || 0).toFixed(2)} kg
                      </span>
                      <button onClick={() => onDelete(a.id)} style={{ background: '#fee', border: 'none', color: '#e74c3c', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;