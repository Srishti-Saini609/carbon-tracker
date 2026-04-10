import { useNavigate } from 'react-router-dom';

const ProgressPage = ({ activities }) => {
  const navigate = useNavigate();
  const list = activities || [];

  // Calculate totals
  const totalCO2e = list.reduce((sum, a) => sum + (a.co2e || 0), 0);
  const treesNeeded = (totalCO2e / 25).toFixed(1);
  
  // Calculate streak
  const getStreak = () => {
    if (list.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
      const hasActivity = list.some(a => {
        const actDate = new Date(a.date);
        actDate.setHours(0, 0, 0, 0);
        return actDate.getTime() === currentDate.getTime();
      });
      
      if (!hasActivity) break;
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
      
      if (streak > 365) break;
    }
    
    return streak;
  };

  const streak = getStreak();

  // Weekly progress
  const getWeeklyData = () => {
    const weeks = [];
    for (let i = 6; i >= 0; i--) {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - i);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 1);

      const weekActivities = list.filter(a => {
        const actDate = new Date(a.date);
        return actDate >= startOfWeek && actDate < endOfWeek;
      });

      const total = weekActivities.reduce((sum, a) => sum + (a.co2e || 0), 0);
      weeks.push({
        day: startOfWeek.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: startOfWeek.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        co2e: total.toFixed(2),
        count: weekActivities.length
      });
    }
    return weeks;
  };

  const weeklyData = getWeeklyData();
  const maxCO2 = Math.max(...weeklyData.map(w => parseFloat(w.co2e)), 1);

  // Monthly trends
  const getMonthlyData = () => {
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthActivities = list.filter(a => {
        const actDate = new Date(a.date);
        return actDate >= monthStart && actDate <= monthEnd;
      });

      const total = monthActivities.reduce((sum, a) => sum + (a.co2e || 0), 0);
      months.push({
        name: monthNames[date.getMonth()],
        co2e: total.toFixed(1),
        count: monthActivities.length
      });
    }
    return months;
  };

  const monthlyData = getMonthlyData();
  const maxMonthly = Math.max(...monthlyData.map(m => parseFloat(m.co2e)), 1);

  // Month over month comparison
  const currentMonth = monthlyData[monthlyData.length - 1];
  const lastMonth = monthlyData[monthlyData.length - 2];
  const percentageChange = lastMonth && parseFloat(lastMonth.co2e) > 0 
    ? (((parseFloat(currentMonth.co2e) - parseFloat(lastMonth.co2e)) / parseFloat(lastMonth.co2e)) * 100).toFixed(1)
    : 0;

  // Achievements
  const getAchievements = () => {
    const achievements = [];
    const zeroTrips = list.filter(a => (a.co2e || 0) === 0).length;
    const totalActivities = list.length;

    if (totalActivities >= 10) {
      achievements.push({ icon: '🌱', title: 'Eco Starter', desc: 'Logged 10+ activities', unlocked: true });
    }
    if (zeroTrips >= 5) {
      achievements.push({ icon: '🚴', title: 'Zero Hero', desc: '5+ zero-emission trips', unlocked: true });
    }
    if (totalCO2e < 100 && totalActivities >= 5) {
      achievements.push({ icon: '🌟', title: 'Low Carbon', desc: 'Under 100 kg CO₂e', unlocked: true });
    }
    if (totalActivities >= 20) {
      achievements.push({ icon: '🏆', title: 'Consistency King', desc: '20+ activities logged', unlocked: true });
    }
    if (list.some(a => a.type === 'diet' && (a.category === 'vegan' || a.category === 'vegetarian'))) {
      achievements.push({ icon: '🥗', title: 'Green Eater', desc: 'Plant-based meals', unlocked: true });
    }
    if (list.some(a => a.type === 'travel' && (a.category === 'cycling' || a.category === 'walking'))) {
      achievements.push({ icon: '🚶', title: 'Active Commuter', desc: 'Walked/cycled trips', unlocked: true });
    }
    if (streak >= 7) {
      achievements.push({ icon: '🔥', title: 'On Fire', desc: '7-day streak', unlocked: true });
    }

    // Locked
    if (totalActivities < 10) achievements.push({ icon: '🔒', title: 'Eco Starter', desc: 'Log 10 activities', unlocked: false });
    if (zeroTrips < 5) achievements.push({ icon: '🔒', title: 'Zero Hero', desc: '5 zero-emission trips', unlocked: false });
    if (streak < 7) achievements.push({ icon: '🔒', title: 'On Fire', desc: '7-day streak', unlocked: false });

    return achievements;
  };

  const achievements = getAchievements();

  // Smart Insights
  const getInsights = () => {
    const insights = [];
    const byType = {};
    list.forEach(a => {
      byType[a.type] = (byType[a.type] || 0) + (a.co2e || 0);
    });

    const highest = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
    
    if (highest) {
      const category = highest[0];
      const percentage = totalCO2e > 0 ? ((highest[1] / totalCO2e) * 100).toFixed(0) : 0;
      
      if (category === 'travel') {
        insights.push({
          icon: '🚗',
          title: 'Transportation Impact',
          desc: `${percentage}% of your footprint comes from travel. Try cycling or public transport!`,
          color: '#e74c3c'
        });
      }
      if (category === 'energy') {
        insights.push({
          icon: '⚡',
          title: 'Energy Usage',
          desc: `${percentage}% from energy. Switch to LED bulbs and unplug devices!`,
          color: '#f39c12'
        });
      }
      if (category === 'diet') {
        insights.push({
          icon: '🍽️',
          title: 'Food Choices',
          desc: `${percentage}% from diet. Try more plant-based meals!`,
          color: '#27ae60'
        });
      }
    }

    const zeroTrips = list.filter(a => (a.co2e || 0) === 0).length;
    if (zeroTrips > 0) {
      insights.push({
        icon: '✅',
        title: 'Great Job!',
        desc: `You've made ${zeroTrips} zero-emission trips. Keep it up!`,
        color: '#27ae60'
      });
    }

    if (streak > 0) {
      insights.push({
        icon: '🔥',
        title: 'Streak Alert',
        desc: `You're on a ${streak}-day streak! Don't break it!`,
        color: '#e67e22'
      });
    }

    if (list.length === 0) {
      insights.push({
        icon: '💡',
        title: 'Get Started',
        desc: 'Log your first activity to see personalized insights!',
        color: '#3498db'
      });
    }

    return insights;
  };

  const insights = getInsights();

  // 🌍 DYNAMIC LEADERBOARD - Based on Your Dataset
  const getLeaderboard = () => {
    // Your current user data
    const yourCO2e = totalCO2e;
    const yourActivities = list.length;

    // Simulate community users with realistic footprints
    // Their scores adjust based on your activity level
    const baseUsers = [
      { name: 'Priya S.', baseCO2e: 180, activityCount: 28 },
      { name: 'Rahul M.', baseCO2e: 320, activityCount: 35 },
      { name: 'Ananya K.', baseCO2e: 145, activityCount: 22 },
      { name: 'Vikram P.', baseCO2e: 410, activityCount: 42 },
      { name: 'Sneha R.', baseCO2e: 225, activityCount: 31 },
      { name: 'Arjun K.', baseCO2e: 175, activityCount: 26 },
      { name: 'Meera P.', baseCO2e: 290, activityCount: 38 },
      { name: 'Rohan M.', baseCO2e: 195, activityCount: 29 },
    ];

    // Calculate adjustment factor based on your activity count
    const avgActivity = yourActivities > 0 ? yourActivities : 20;
    
    // Build leaderboard array
    const allUsers = [
      {
        name: 'You',
        co2e: yourCO2e,
        activities: yourActivities,
        isYou: true
      },
      ...baseUsers.map(user => {
        const variation = (Math.random() * 0.4) + 0.8; // 0.8 to 1.2 variation
        const adjustedCO2e = user.baseCO2e * variation * (avgActivity / 25);
        return {
          name: user.name,
          co2e: adjustedCO2e,
          activities: Math.floor(user.activityCount * (avgActivity / 25)),
          isYou: false
        };
      })
    ];

    // Sort by CO2e (lower is better) and assign ranks
    return allUsers
      .sort((a, b) => a.co2e - b.co2e)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
        co2e: user.co2e.toFixed(1)
      }));
  };

  const leaderboard = getLeaderboard();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      padding: '20px'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}
          >
            ← Back
          </button>
          <h1 style={{ color: 'white', margin: 0, fontSize: '28px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            📊 Progress & Insights
          </h1>
          <div style={{ width: '80px' }}></div>
        </div>

        {/* Streak & Offset Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {/* Streak Counter */}
          <div className="card" style={{ 
            padding: '24px', 
            background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            color: 'white'
          }}>
            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>🔥 Current Streak</p>
            <h2 style={{ fontSize: '48px', margin: '0', fontWeight: '700' }}>{streak}</h2>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>days in a row</p>
            {streak >= 7 && <p style={{ fontSize: '12px', marginTop: '12px', background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>🏆 On Fire! Keep it up!</p>}
          </div>

          {/* Carbon Offset */}
          <div className="card" style={{ 
            padding: '24px', 
            background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
            color: 'white'
          }}>
            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>🌳 Trees to Offset</p>
            <h2 style={{ fontSize: '48px', margin: '0', fontWeight: '700' }}>{treesNeeded}</h2>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>trees needed</p>
            <p style={{ fontSize: '12px', marginTop: '12px', background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              1 tree absorbs ~25 kg CO₂e/year
            </p>
          </div>

          {/* Monthly Change */}
          <div className="card" style={{ 
            padding: '24px', 
            background: parseFloat(percentageChange) <= 0 
              ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' 
              : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            color: 'white'
          }}>
            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>📈 vs Last Month</p>
            <h2 style={{ fontSize: '48px', margin: '0', fontWeight: '700' }}>
              {parseFloat(percentageChange) <= 0 ? '↓' : '↑'} {Math.abs(percentageChange)}%
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>
              {parseFloat(percentageChange) <= 0 ? 'Great! You improved!' : 'Can do better!'}
            </p>
            <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>
              This month: {currentMonth.co2e} kg | Last month: {lastMonth?.co2e || 0} kg
            </p>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px' }}>📈 Weekly Progress</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px' }}>
            {weeklyData.map((week, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${(parseFloat(week.co2e) / maxCO2) * 150}px`,
                  background: parseFloat(week.co2e) < 20 ? '#27ae60' : parseFloat(week.co2e) < 50 ? '#f39c12' : '#e74c3c',
                  borderRadius: '8px 8px 0 0',
                  transition: 'height 0.3s'
                }}></div>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>{week.day}</p>
                <p style={{ fontSize: '10px', color: '#999' }}>{week.co2e} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px' }}>📊 Monthly Trends (Last 6 Months)</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '220px' }}>
            {monthlyData.map((month, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${(parseFloat(month.co2e) / maxMonthly) * 170}px`,
                  background: i === monthlyData.length - 1 ? '#134e5e' : '#3498db',
                  borderRadius: '8px 8px 0 0',
                  transition: 'height 0.3s'
                }}></div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center', fontWeight: '600' }}>{month.name}</p>
                <p style={{ fontSize: '10px', color: '#999' }}>{month.co2e} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Achievements Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {/* Smart Insights */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ color: '#333', marginBottom: '16px', fontSize: '20px' }}>💡 Smart Insights</h2>
            {insights.map((insight, i) => (
              <div key={i} style={{
                padding: '16px',
                background: `${insight.color}10`,
                borderLeft: `4px solid ${insight.color}`,
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <p style={{ fontSize: '24px', marginBottom: '8px' }}>{insight.icon}</p>
                <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '6px' }}>{insight.title}</h3>
                <p style={{ fontSize: '13px', color: '#666' }}>{insight.desc}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ color: '#333', marginBottom: '16px', fontSize: '20px' }}>🏆 Achievements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {achievements.map((ach, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: ach.unlocked ? 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)' : '#f5f5f5',
                  borderRadius: '12px',
                  textAlign: 'center',
                  opacity: ach.unlocked ? 1 : 0.5
                }}>
                  <p style={{ fontSize: '32px', marginBottom: '8px' }}>{ach.icon}</p>
                  <h3 style={{ color: '#333', fontSize: '13px', marginBottom: '4px' }}>{ach.title}</h3>
                  <p style={{ fontSize: '11px', color: '#777' }}>{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🌍 Dynamic Leaderboard */}
        <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '16px', fontSize: '20px' }}>🌍 Community Leaderboard</h2>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
            Lower CO₂e = Better Rank! Based on {list.length} activities from your community.
          </p>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {leaderboard.map((player, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: player.isYou 
                  ? 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' 
                  : i < 3 
                    ? 'linear-gradient(135deg, #fff9c4 0%, #ffffff 100%)'
                    : '#f8f9fa',
                borderRadius: '12px',
                color: player.isYou ? 'white' : '#333',
                border: i < 3 && !player.isYou ? '2px solid #f1c40f' : '2px solid transparent',
                transform: player.isYou ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s'
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: player.rank === 1 
                    ? 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)' 
                    : player.rank === 2 
                      ? 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)'
                      : player.rank === 3 
                        ? 'linear-gradient(135deg, #cd7f32 0%, #d35400 100%)'
                        : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: player.rank <= 3 ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
                }}>
                  {player.rank === 1 ? '👑' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>
                    {player.name} {player.isYou && '👤'}
                  </p>
                  <p style={{ fontSize: '12px', opacity: 0.8 }}>
                    {player.activities} activities logged
                  </p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', fontSize: '20px', color: player.isYou ? '#2ecc71' : '#e74c3c' }}>
                    {player.co2e}
                  </p>
                  <p style={{ fontSize: '11px', opacity: 0.8 }}>kg CO₂e</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Tips */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ color: '#333', marginBottom: '16px', fontSize: '20px' }}>🌿 Sustainability Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '8px' }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>💡</p>
              <h3 style={{ color: '#2e7d32', fontSize: '14px', marginBottom: '6px' }}>Save Energy</h3>
              <p style={{ fontSize: '12px', color: '#555' }}>Unplug devices when not in use. Saves up to 10% on electricity!</p>
            </div>
            <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '8px' }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>🚲</p>
              <h3 style={{ color: '#1976d2', fontSize: '14px', marginBottom: '6px' }}>Cycle More</h3>
              <p style={{ fontSize: '12px', color: '#555' }}>Cycling 5 km instead of driving saves ~1 kg CO₂e per trip.</p>
            </div>
            <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '8px' }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>🥗</p>
              <h3 style={{ color: '#f57c00', fontSize: '14px', marginBottom: '6px' }}>Eat Green</h3>
              <p style={{ fontSize: '12px', color: '#555' }}>One meatless day per week saves ~50 kg CO₂e per month!</p>
            </div>
            <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '8px' }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>♻️</p>
              <h3 style={{ color: '#7b1fa2', fontSize: '14px', marginBottom: '6px' }}>Reduce & Reuse</h3>
              <p style={{ fontSize: '12px', color: '#555' }}>Buy second-hand clothing. Saves 10 kg CO₂e per item!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;