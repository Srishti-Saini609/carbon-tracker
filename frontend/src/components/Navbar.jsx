import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      background: 'white', 
      padding: '16px 24px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        color: '#667eea',
        textDecoration: 'none'
      }}>
        🌱 CarbonTracker
      </Link>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link 
          to="/log-activity"
          style={{
            background: '#3498db',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          📝 Log Activity
        </Link>
        
        <Link 
          to="/meter"
          style={{
            background: '#27ae60',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
           Carbon Meter
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;