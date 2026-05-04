import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import * as apiService from '../services/api';
import { useAuth } from '../context/AuthContext';

const SquadsPage = () => {
  const { user } = useAuth();
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    targetValue: '',
    image: '🌿'
  });

  const loadSquads = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchSquads();
      setSquads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSquads();
  }, []);

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    try {
      await apiService.createSquad(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '', goal: '', targetValue: '', image: '🌿' });
      loadSquads();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleJoinSquad = async (squadId) => {
    try {
      await apiService.joinSquad(squadId);
      loadSquads();
    } catch (err) {
      alert(err.message);
    }
  };

  const [selectedSquad, setSelectedSquad] = useState(null);

  const handleViewDetails = async (id) => {
    try {
      const data = await apiService.getSquadById(id);
      setSelectedSquad(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-black uppercase tracking-widest text-xs">Loading Squads...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 page-enter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">Social Squads</h1>
            <p className="text-gray-500 font-medium">Join forces with others to multiply your environmental impact.</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary py-4 px-8 rounded-2xl shadow-xl shadow-primary/20"
          >
            + Create New Squad
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 font-bold border border-red-100 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {squads.map((squad) => {
            const isMember = squad.members.some(m => m._id === user?.id || m === user?.id);
            return (
              <div key={squad._id} className="card group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden p-0">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                      {squad.image}
                    </div>
                    <div className="bg-accent-green/10 text-accent-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {squad.members.length} Members
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-primary mb-2 tracking-tight">{squad.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Goal: {squad.goal}</p>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">{squad.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
                      <span className="text-sm font-black text-primary">
                        {Math.round((squad.currentValue / squad.targetValue) * 100) || 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-green transition-all duration-1000"
                        style={{ width: `${Math.min((squad.currentValue / squad.targetValue) * 100, 100) || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Impact</p>
                      <p className="text-lg font-black text-accent-gold">{squad.currentValue}kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Creator</p>
                      <p className="text-lg font-black text-primary">{squad.creator?.name || 'Unknown'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex border-t border-gray-100">
                  <button 
                    onClick={() => handleViewDetails(squad._id)}
                    className="flex-1 py-5 bg-white text-primary text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 border-r border-gray-100"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => isMember ? alert('You are already in this squad!') : handleJoinSquad(squad._id)}
                    className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      isMember 
                        ? 'bg-accent-green/10 text-accent-green cursor-default' 
                        : 'bg-primary text-white hover:bg-slate-800'
                    }`}
                  >
                    {isMember ? 'Joined' : 'Join Squad'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Squad Details Modal */}
        {selectedSquad && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setSelectedSquad(null)}></div>
            <div className="card w-full max-w-2xl relative z-10 p-0 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-5xl">
                      {selectedSquad.image}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-primary tracking-tight mb-2">{selectedSquad.name}</h2>
                      <p className="text-accent-green text-xs font-black uppercase tracking-widest">
                        {selectedSquad.members?.length} Active Members
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSquad(null)} className="text-gray-400 hover:text-primary text-2xl">✕</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Team Goal</p>
                    <p className="text-sm font-bold text-primary">{selectedSquad.goal}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Value</p>
                    <p className="text-xl font-black text-primary">{selectedSquad.targetValue}kg</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Impact</p>
                    <p className="text-xl font-black text-accent-green">{selectedSquad.currentValue}kg</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">About the Squad</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{selectedSquad.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Top Contributors</h3>
                  <div className="space-y-3">
                    {selectedSquad.members?.slice(0, 3).map((member, i) => (
                      <div key={member._id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {member.name?.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-primary">{member.name}</span>
                        </div>
                        <span className="text-xs font-bold text-accent-gold">{i === 0 ? '🏆 Leader' : '⭐ Contributor'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSquad(null)}
                className="w-full py-6 bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                Close Intelligence View
              </button>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
            <div className="card w-full max-w-lg relative z-10 p-10 animate-in fade-in zoom-in duration-300">
              <h2 className="text-3xl font-black text-primary mb-8 tracking-tight">Create a Squad</h2>
              <form onSubmit={handleCreateSquad} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Squad Name</label>
                  <input 
                    type="text" 
                    required 
                    className="input-field" 
                    placeholder="e.g. Eco Warriors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                  <textarea 
                    required 
                    className="input-field h-24 pt-4" 
                    placeholder="What is your team about?"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Primary Goal</label>
                    <input 
                      type="text" 
                      required 
                      className="input-field" 
                      placeholder="e.g. Reduce CO2"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Target (kg)</label>
                    <input 
                      type="number" 
                      required 
                      className="input-field" 
                      placeholder="500"
                      value={formData.targetValue}
                      onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-4 mt-4">Initialize Squad</button>
              </form>
            </div>
          </div>
        )}

        {/* Community Activity Feed */}
        <div className="mt-20">
          <h2 className="text-2xl font-black text-primary mb-8 tracking-tight">Recent Squad Activity</h2>
          <div className="space-y-4">
            {[
              { text: "Eco Warriors just reached 50% of their monthly goal!", time: "2 hours ago", icon: "🎉" },
              { text: "Sarah K. logged a 15km cycling trip for Urban Cyclists.", time: "4 hours ago", icon: "🚲" },
              { text: "Plant Based Collective welcomed 3 new members.", time: "6 hours ago", icon: "🤝" }
            ].map((activity, i) => (
              <div key={i} className="card py-6 flex items-center gap-6 border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">{activity.text}</p>
                  <p className="text-xs text-gray-400 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadsPage;
