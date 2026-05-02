import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AutoCarbonMeter from '../components/AutoCarbonMeter';
import Dashboard from '../components/Dashboard';

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-28 bg-gray-200 rounded-2xl"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-96 bg-gray-200 rounded-2xl"></div>
      <div className="h-96 bg-gray-200 rounded-2xl"></div>
    </div>
  </div>
);

const HomePage = ({ activities, onAddActivity, onDeleteActivity, loading, error }) => {
  return (
    <div className="pb-12 pt-6">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 page-enter">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            🌍 Carbon Footprint Tracker
          </h1>
          
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/log-activity"
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-lg">📝</span> Log Activity
            </Link>
            
            <Link 
              to="/meter"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-lg">🌍</span> Carbon Meter
            </Link>

            <Link 
              to="/progress"
              className="btn-secondary flex items-center gap-2"
            >
              <span className="text-lg">📈</span> Progress & Insights
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