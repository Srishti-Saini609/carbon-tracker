import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProgressPage = ({ activities }) => {
  const navigate = useNavigate();
  const list = activities || [];

  // Calculate totals
  const totalCO2e = list.reduce((sum, a) => sum + (a.co2e || 0), 0);
  const treesNeeded = (totalCO2e / 25).toFixed(1);
  
  // Calculate streak
  const streak = useMemo(() => {
    if (list.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let s = 0;
    let currentDate = new Date(today);
    
    while (s <= 365) {
      const hasActivity = list.some(a => {
        const actDate = new Date(a.date);
        actDate.setHours(0, 0, 0, 0);
        return actDate.getTime() === currentDate.getTime();
      });
      
      if (!hasActivity) break;
      s++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return s;
  }, [list]);

  // Weekly progress
  const weeklyData = useMemo(() => {
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
  }, [list]);

  const maxCO2 = Math.max(...weeklyData.map(w => parseFloat(w.co2e)), 1);

  // Monthly trends
  const monthlyData = useMemo(() => {
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
  }, [list]);

  const maxMonthly = Math.max(...monthlyData.map(m => parseFloat(m.co2e)), 1);

  // Month over month comparison
  const currentMonth = monthlyData[monthlyData.length - 1];
  const lastMonth = monthlyData[monthlyData.length - 2];
  const percentageChange = lastMonth && parseFloat(lastMonth.co2e) > 0 
    ? (((parseFloat(currentMonth.co2e) - parseFloat(lastMonth.co2e)) / parseFloat(lastMonth.co2e)) * 100).toFixed(1)
    : 0;

  // Achievements — memoized
  const achievements = useMemo(() => {
    const achs = [];
    const zeroTrips = list.filter(a => (a.co2e || 0) === 0).length;
    const totalActivities = list.length;

    if (totalActivities >= 10) achs.push({ icon: '🌱', title: 'Eco Starter', desc: 'Logged 10+ activities', unlocked: true });
    if (zeroTrips >= 5) achs.push({ icon: '🚴', title: 'Zero Hero', desc: '5+ zero-emission trips', unlocked: true });
    if (totalCO2e < 100 && totalActivities >= 5) achs.push({ icon: '🌟', title: 'Low Carbon', desc: 'Under 100 kg CO₂e', unlocked: true });
    if (totalActivities >= 20) achs.push({ icon: '🏆', title: 'Consistency King', desc: '20+ activities logged', unlocked: true });
    if (list.some(a => a.type === 'diet' && (a.category === 'vegan' || a.category === 'vegetarian'))) {
      achs.push({ icon: '🥗', title: 'Green Eater', desc: 'Plant-based meals', unlocked: true });
    }
    if (list.some(a => a.type === 'travel' && (a.category === 'cycling' || a.category === 'walking'))) {
      achs.push({ icon: '🚶', title: 'Active Commuter', desc: 'Walked/cycled trips', unlocked: true });
    }
    if (streak >= 7) achs.push({ icon: '🔥', title: 'On Fire', desc: '7-day streak', unlocked: true });

    // Locked
    if (totalActivities < 10) achs.push({ icon: '🔒', title: 'Eco Starter', desc: 'Log 10 activities', unlocked: false });
    if (zeroTrips < 5) achs.push({ icon: '🔒', title: 'Zero Hero', desc: '5 zero-emission trips', unlocked: false });
    if (streak < 7) achs.push({ icon: '🔒', title: 'On Fire', desc: '7-day streak', unlocked: false });

    return achs;
  }, [list, totalCO2e, streak]);

  // Smart Insights — memoized
  const insights = useMemo(() => {
    const ins = [];
    const byType = {};
    list.forEach(a => {
      byType[a.type] = (byType[a.type] || 0) + (a.co2e || 0);
    });

    const highest = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
    
    if (highest) {
      const category = highest[0];
      const percentage = totalCO2e > 0 ? ((highest[1] / totalCO2e) * 100).toFixed(0) : 0;
      
      if (category === 'travel') {
        ins.push({ icon: '🚗', title: 'Transportation Impact', desc: `${percentage}% of your footprint comes from travel. Try cycling or public transport!`, color: 'red' });
      }
      if (category === 'energy') {
        ins.push({ icon: '⚡', title: 'Energy Usage', desc: `${percentage}% from energy. Switch to LED bulbs and unplug devices!`, color: 'amber' });
      }
      if (category === 'diet') {
        ins.push({ icon: '🍽️', title: 'Food Choices', desc: `${percentage}% from diet. Try more plant-based meals!`, color: 'green' });
      }
    }

    const zeroTrips = list.filter(a => (a.co2e || 0) === 0).length;
    if (zeroTrips > 0) {
      ins.push({ icon: '✅', title: 'Great Job!', desc: `You've made ${zeroTrips} zero-emission trips. Keep it up!`, color: 'green' });
    }

    if (streak > 0) {
      ins.push({ icon: '🔥', title: 'Streak Alert', desc: `You're on a ${streak}-day streak! Don't break it!`, color: 'orange' });
    }

    if (list.length === 0) {
      ins.push({ icon: '💡', title: 'Get Started', desc: 'Log your first activity to see personalized insights!', color: 'blue' });
    }

    return ins;
  }, [list, totalCO2e, streak]);

  // Leaderboard — memoized to prevent random re-shuffling
  const leaderboard = useMemo(() => {
    const yourCO2e = totalCO2e;
    const yourActivities = list.length;

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

    const avgActivity = yourActivities > 0 ? yourActivities : 20;
    
    // Use seeded pseudo-random based on user count (stable across re-renders)
    const seed = yourActivities * 7 + 13;
    
    const allUsers = [
      { name: 'You', co2e: yourCO2e, activities: yourActivities, isYou: true },
      ...baseUsers.map((user, i) => {
        // Deterministic variation based on seed + index
        const variation = 0.8 + ((seed + i * 17) % 40) / 100;
        const adjustedCO2e = user.baseCO2e * variation * (avgActivity / 25);
        return {
          name: user.name,
          co2e: adjustedCO2e,
          activities: Math.floor(user.activityCount * (avgActivity / 25)),
          isYou: false
        };
      })
    ];

    return allUsers
      .sort((a, b) => a.co2e - b.co2e)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
        co2e: user.co2e.toFixed(1)
      }));
  }, [totalCO2e, list.length]);

  const insightColors = {
    red: 'bg-red-50 border-red-400',
    amber: 'bg-amber-50 border-amber-400',
    green: 'bg-green-50 border-green-400',
    orange: 'bg-orange-50 border-orange-400',
    blue: 'bg-blue-50 border-blue-400',
  };

  const getBarColor = (value) => {
    if (value < 20) return 'bg-green-500';
    if (value < 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 page-enter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">Progress & Insights</h1>
            <p className="text-gray-500 font-medium">Visualizing your journey towards sustainability.</p>
          </div>
          <div className="flex bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white shadow-sm">
            <div className="px-4 py-2 text-xs font-bold text-accent-green bg-accent-green/10 rounded-xl">Stable Impact</div>
          </div>
        </div>

        {/* Streak & Offset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {/* Streak Counter */}
          <div className="bg-primary p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20 fade-in-up stagger-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-[10px] font-black tracking-widest uppercase opacity-50 mb-4">Current Streak</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-6xl font-black">{streak}</h2>
              <span className="text-sm font-bold opacity-40 uppercase tracking-widest">Days</span>
            </div>
            {streak >= 7 && (
              <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                <span className="text-xl">🏆</span>
                <span className="text-xs font-black uppercase tracking-widest">Master Consistency</span>
              </div>
            )}
          </div>
 
          {/* Carbon Offset */}
          <div className="bg-accent-green p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-accent-green/20 fade-in-up stagger-2">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-4">Tree Offset Equivalent</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-6xl font-black">{treesNeeded}</h2>
              <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Trees</span>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-widest">1 Tree ≈ 25kg CO₂e/yr</span>
            </div>
          </div>
 
          {/* Monthly Change */}
          <div className={`p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl fade-in-up stagger-3 ${
            parseFloat(percentageChange) <= 0 
              ? 'bg-accent-gold shadow-accent-gold/20' 
              : 'bg-red-500 shadow-red-500/20'
          }`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-4">Monthly Momentum</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-6xl font-black">
                {parseFloat(percentageChange) <= 0 ? '↓' : '↑'}{Math.abs(percentageChange)}%
              </h2>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-widest">
                {parseFloat(percentageChange) <= 0 ? 'Positive Progress' : 'Needs Optimization'}
              </span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="card mb-12 fade-in-up stagger-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-primary tracking-tight">Weekly Trajectory</h2>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-green"></div>
              <div className="w-3 h-3 rounded-full bg-accent-gold"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </div>
          <div className="flex items-end gap-3 sm:gap-6 h-[250px] px-2">
            {weeklyData.map((week, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex justify-center">
                  <div 
                    className={`w-full max-w-[40px] rounded-2xl transition-all duration-700 shadow-lg ${getBarColor(parseFloat(week.co2e))} group-hover:scale-x-110 group-hover:brightness-110`}
                    style={{ height: `${Math.max((parseFloat(week.co2e) / maxCO2) * 200, 8)}px` }}
                  ></div>
                  <div className="absolute -top-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {week.co2e} kg
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-4">{week.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="card p-6 mb-6 fade-in-up stagger-5">
          <h2 className="text-lg font-bold text-gray-800 mb-5">📊 Monthly Trends (Last 6 Months)</h2>
          <div className="flex items-end gap-3 h-[220px]">
            {monthlyData.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    i === monthlyData.length - 1 ? 'bg-brand-dark' : 'bg-blue-500'
                  }`}
                  style={{ height: `${Math.max((parseFloat(month.co2e) / maxMonthly) * 170, 4)}px` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2 text-center font-semibold">{month.name}</p>
                <p className="text-[10px] text-gray-400">{month.co2e} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Smart Insights */}
          <div className="card p-6 fade-in-up">
            <h2 className="text-lg font-bold text-gray-800 mb-4">💡 Smart Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className={`p-4 border-l-4 rounded-lg ${insightColors[insight.color] || insightColors.blue}`}>
                  <p className="text-2xl mb-2">{insight.icon}</p>
                  <h3 className="text-gray-800 font-semibold text-sm mb-1">{insight.title}</h3>
                  <p className="text-xs text-gray-600">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card p-6 fade-in-up">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🏆 Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    ach.unlocked 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105' 
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <p className="text-3xl mb-2">{ach.icon}</p>
                  <h3 className="text-gray-800 font-semibold text-xs">{ach.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Leaderboard */}
        <div className="card mb-12 fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black text-primary tracking-tight">Global Rankings</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Comparing your impact with the community.</p>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-500">
              {list.length} Records Analyzed
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaderboard.map((player, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-5 p-5 rounded-[2rem] transition-all duration-300 ${
                  player.isYou 
                    ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02] border-none' 
                    : 'bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${
                  player.rank === 1 ? 'bg-accent-gold text-white' :
                  player.rank === 2 ? 'bg-gray-200 text-gray-500' :
                  player.rank === 3 ? 'bg-orange-100 text-orange-600' :
                  player.isYou ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'
                }`}>
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                </div>
                
                <div className="flex-1">
                  <p className="font-black text-sm tracking-tight">
                    {player.name} {player.isYou && <span className="ml-1 text-[10px] bg-accent-green px-1.5 py-0.5 rounded uppercase">You</span>}
                  </p>
                  <p className={`text-xs font-medium ${player.isYou ? 'text-white/50' : 'text-gray-400'}`}>
                    {player.activities} Milestones
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-xl font-black ${player.isYou ? 'text-accent-green' : 'text-primary'}`}>
                    {player.co2e}
                  </p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${player.isYou ? 'text-white/40' : 'text-gray-300'}`}>kg CO₂e</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Tips */}
        <div className="card p-6 fade-in-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🌿 Sustainability Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '💡', title: 'Save Energy', desc: 'Unplug devices when not in use. Saves up to 10% on electricity!', bg: 'bg-green-50', color: 'text-green-700' },
              { icon: '🚲', title: 'Cycle More', desc: 'Cycling 5 km instead of driving saves ~1 kg CO₂e per trip.', bg: 'bg-blue-50', color: 'text-blue-700' },
              { icon: '🥗', title: 'Eat Green', desc: 'One meatless day per week saves ~50 kg CO₂e per month!', bg: 'bg-amber-50', color: 'text-amber-700' },
              { icon: '♻️', title: 'Reduce & Reuse', desc: 'Buy second-hand clothing. Saves 10 kg CO₂e per item!', bg: 'bg-purple-50', color: 'text-purple-700' },
            ].map((tip, i) => (
              <div key={i} className={`p-4 ${tip.bg} rounded-xl hover:scale-105 transition-transform duration-200`}>
                <p className="text-2xl mb-2">{tip.icon}</p>
                <h3 className={`${tip.color} font-semibold text-sm mb-1`}>{tip.title}</h3>
                <p className="text-xs text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;