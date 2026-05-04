import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AutoCarbonMeter from '../components/AutoCarbonMeter';
import Dashboard from '../components/Dashboard';

const LoadingSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-40 bg-gray-200/50 rounded-3xl"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="h-[30rem] bg-gray-200/50 rounded-[2.5rem]"></div>
      <div className="h-[30rem] bg-gray-200/50 rounded-[2.5rem]"></div>
    </div>
  </div>
);

const HomePage = ({ activities, onAddActivity, onDeleteActivity, loading, error }) => {
  return (
    <div className="pb-12 pt-6">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 page-enter">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium">Your sustainability journey is making an impact.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/log-activity"
              className="btn-primary flex items-center gap-3 group"
            >
              <span className="text-xl group-hover:rotate-12 transition-transform">📝</span> 
              <span>Log Activity</span>
            </Link>
            
            <Link 
              to="/meter"
              className="btn-gold flex items-center gap-3 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🌍</span> 
              <span>Carbon Meter</span>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <AutoCarbonMeter onActivityLogged={onAddActivity} />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center font-medium fade-in-up" role="alert">
            ⚠️ {error}
          </div>
        )}

        <div className="card">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <Dashboard activities={activities} onDelete={onDeleteActivity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;