import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ActivityFormComponent from '../components/ActivityFormComponent';

const LogActivityPage = ({ onActivityAdded }) => {
  const navigate = useNavigate();

  const handleAdd = async (activity) => {
    await onActivityAdded(activity);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 page-enter">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            📝 Log Activity
          </h1>
          <p className="text-gray-500 mt-2">Track your daily carbon footprint</p>
        </div>

        {/* Form */}
        <div className="card mb-8 fade-in-up">
          <ActivityFormComponent onAdd={handleAdd} onCancel={handleCancel} />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: '🚗', title: 'Travel', desc: 'Car, bus, train, flight' },
            { icon: '⚡', title: 'Energy', desc: 'Electricity, gas, LPG' },
            { icon: '🍽️', title: 'Diet', desc: 'Meat, veg, vegan' },
            { icon: '🛍️', title: 'Shopping', desc: 'Clothing, electronics' },
          ].map((item, i) => (
            <div key={item.title} className={`card text-center hover:scale-105 transition-transform duration-200 fade-in-up stagger-${i + 1}`}>
              <p className="text-4xl mb-3">{item.icon}</p>
              <p className="font-bold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Emission Factors Info */}
        <div className="card fade-in-up stagger-5">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">📊 Emission Factors Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-bold text-brand-dark mb-3">Travel <span className="text-sm font-normal text-gray-500">(kg CO₂e/km)</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                {[['Car (Petrol)', '0.192'], ['Car (Diesel)', '0.171'], ['Bus', '0.089'], ['Train', '0.041'], ['Flight', '0.255'], ['Walking/Cycling', '0']].map(([name, val]) => (
                  <li key={name} className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{name}</span> <span className="font-mono">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-dark mb-3">Energy <span className="text-sm font-normal text-gray-500">(kg CO₂e/unit)</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                {[['Electricity', '0.82/kWh'], ['Natural Gas', '2.0/m³'], ['LPG', '1.5/kg']].map(([name, val]) => (
                  <li key={name} className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{name}</span> <span className="font-mono">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-dark mb-3">Diet <span className="text-sm font-normal text-gray-500">(kg CO₂e/kg)</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                {[['Beef', '27.0'], ['Chicken', '6.9'], ['Vegetarian', '2.5'], ['Vegan', '1.5']].map(([name, val]) => (
                  <li key={name} className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{name}</span> <span className="font-mono">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-dark mb-3">Shopping <span className="text-sm font-normal text-gray-500">(kg CO₂e/item)</span></p>
              <ul className="text-sm text-gray-600 space-y-2">
                {[['Clothing', '10.0'], ['Electronics', '50.0']].map(([name, val]) => (
                  <li key={name} className="flex justify-between border-b border-gray-100 pb-1">
                    <span>{name}</span> <span className="font-mono">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogActivityPage;