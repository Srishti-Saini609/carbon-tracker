import { useNavigate } from 'react-router-dom';
import ActivityFormComponent from '../components/ActivityFormComponent';

const LogActivityPage = ({ onActivityAdded }) => {
  const navigate = useNavigate();

  const handleAdd = (activity) => {
    onActivityAdded(activity);
    alert('✅ Activity logged successfully!');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      padding: '20px'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
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
            ← Back to Dashboard
          </button>
          <h1 style={{ color: 'white', margin: 0, fontSize: '28px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            📝 Log Activity
          </h1>
          <div style={{ width: '80px' }}></div>
        </div>

        {/* Form */}
        <ActivityFormComponent onAdd={handleAdd} onCancel={handleCancel} />

        {/* Info Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '40px'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '10px' }}>🚗</p>
            <p style={{ fontWeight: '600', color: '#333' }}>Travel</p>
            <p style={{ fontSize: '13px', color: '#777' }}>Car, bus, train, flight</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</p>
            <p style={{ fontWeight: '600', color: '#333' }}>Energy</p>
            <p style={{ fontSize: '13px', color: '#777' }}>Electricity, gas, LPG</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '10px' }}>🍽️</p>
            <p style={{ fontWeight: '600', color: '#333' }}>Diet</p>
            <p style={{ fontSize: '13px', color: '#777' }}>Meat, veg, vegan meals</p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '32px', marginBottom: '10px' }}>🛍️</p>
            <p style={{ fontWeight: '600', color: '#333' }}>Shopping</p>
            <p style={{ fontSize: '13px', color: '#777' }}>Clothing, electronics</p>
          </div>
        </div>

        {/* Emission Factors Info */}
        <div className="card" style={{ marginTop: '20px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>📊 Emission Factors Used</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px'
          }}>
            <div>
              <p style={{ fontWeight: '600', color: '#134e5e', marginBottom: '8px' }}>Travel (kg CO₂e/km)</p>
              <ul style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                <li>Car (Petrol): 0.192</li>
                <li>Car (Diesel): 0.171</li>
                <li>Bus: 0.089</li>
                <li>Train: 0.041</li>
                <li>Flight: 0.255</li>
                <li>Walking/Cycling: 0</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: '600', color: '#134e5e', marginBottom: '8px' }}>Energy (kg CO₂e/unit)</p>
              <ul style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                <li>Electricity: 0.82/kWh</li>
                <li>Natural Gas: 2.0/m³</li>
                <li>LPG: 1.5/kg</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: '600', color: '#134e5e', marginBottom: '8px' }}>Diet (kg CO₂e/kg or meal)</p>
              <ul style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                <li>Beef: 27.0</li>
                <li>Chicken: 6.9</li>
                <li>Vegetarian: 2.5</li>
                <li>Vegan: 1.5</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: '600', color: '#134e5e', marginBottom: '8px' }}>Shopping (kg CO₂e/item)</p>
              <ul style={{ fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                <li>Clothing: 10.0</li>
                <li>Electronics: 50.0</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogActivityPage;