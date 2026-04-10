import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AutoCarbonMeter from '../components/AutoCarbonMeter';
import Dashboard from '../components/Dashboard';

const HomePage = ({ activities, onAddActivity, onDeleteActivity }) => {
  const loadDemoData = () => {
    const demoData = [
      {id:'1',type:'travel',category:'car_petrol',value:45.5,unit:'km',co2e:8.74,date:new Date().toISOString()},
      {id:'2',type:'travel',category:'walking',value:5.2,unit:'km',co2e:0,date:new Date().toISOString()},
      {id:'3',type:'energy',category:'electricity',value:120,unit:'kWh',co2e:98.4,date:new Date().toISOString()},
      {id:'4',type:'diet',category:'meat_beef',value:2.5,unit:'kg',co2e:67.5,date:new Date().toISOString()},
      {id:'5',type:'travel',category:'bus',value:15,unit:'km',co2e:1.34,date:new Date(Date.now()-864e5).toISOString()},
      {id:'6',type:'diet',category:'vegetarian',value:2.5,unit:'kg',co2e:6.25,date:new Date(Date.now()-864e5).toISOString()},
      {id:'7',type:'shopping',category:'clothing',value:1,unit:'items',co2e:10,date:new Date(Date.now()-864e5).toISOString()},
      {id:'8',type:'travel',category:'cycling',value:12,unit:'km',co2e:0,date:new Date(Date.now()-1728e5).toISOString()},
      {id:'9',type:'energy',category:'natural_gas',value:35,unit:'m³',co2e:70,date:new Date(Date.now()-1728e5).toISOString()},
      {id:'10',type:'diet',category:'vegan',value:2.2,unit:'kg',co2e:3.3,date:new Date(Date.now()-2592e5).toISOString()},
      {id:'11',type:'travel',category:'train',value:150,unit:'km',co2e:6.15,date:new Date(Date.now()-2592e5).toISOString()},
      {id:'12',type:'shopping',category:'electronics',value:1,unit:'items',co2e:50,date:new Date(Date.now()-3456e5).toISOString()},
      {id:'13',type:'travel',category:'car_diesel',value:80,unit:'km',co2e:13.68,date:new Date(Date.now()-432e6).toISOString()},
      {id:'14',type:'energy',category:'lpg',value:15,unit:'kg',co2e:22.5,date:new Date(Date.now()-5184e5).toISOString()},
      {id:'15',type:'diet',category:'meat_chicken',value:1.8,unit:'kg',co2e:12.42,date:new Date(Date.now()-5184e5).toISOString()},
      {id:'16',type:'travel',category:'flight_domestic',value:850,unit:'km',co2e:216.75,date:new Date(Date.now()-6912e5).toISOString()},
      {id:'17',type:'energy',category:'electricity',value:95,unit:'kWh',co2e:77.9,date:new Date(Date.now()-7776e5).toISOString()},
      {id:'18',type:'diet',category:'vegetarian',value:3,unit:'kg',co2e:7.5,date:new Date(Date.now()-864e6).toISOString()},
      {id:'19',type:'travel',category:'bus',value:18,unit:'km',co2e:1.6,date:new Date(Date.now()-9504e5).toISOString()},
      {id:'20',type:'shopping',category:'clothing',value:2,unit:'items',co2e:20,date:new Date(Date.now()-10368e6).toISOString()},
      {id:'21',type:'diet',category:'meat_beef',value:1.5,unit:'kg',co2e:40.5,date:new Date(Date.now()-11232e6).toISOString()},
      {id:'22',type:'travel',category:'walking',value:3.5,unit:'km',co2e:0,date:new Date(Date.now()-12096e6).toISOString()},
      {id:'23',type:'energy',category:'natural_gas',value:28,unit:'m³',co2e:56,date:new Date(Date.now()-1296e6).toISOString()},
      {id:'24',type:'travel',category:'cycling',value:8,unit:'km',co2e:0,date:new Date(Date.now()-13824e6).toISOString()},
      {id:'25',type:'diet',category:'vegan',value:1.9,unit:'kg',co2e:2.85,date:new Date(Date.now()-14688e6).toISOString()},
      {id:'26',type:'travel',category:'car_petrol',value:35,unit:'km',co2e:6.72,date:new Date(Date.now()-15552e6).toISOString()},
      {id:'27',type:'energy',category:'electricity',value:110,unit:'kWh',co2e:90.2,date:new Date(Date.now()-16416e6).toISOString()},
      {id:'28',type:'diet',category:'meat_chicken',value:2,unit:'kg',co2e:13.8,date:new Date(Date.now()-1728e6).toISOString()},
      {id:'29',type:'travel',category:'train',value:200,unit:'km',co2e:8.2,date:new Date(Date.now()-18144e6).toISOString()},
      {id:'30',type:'shopping',category:'electronics',value:1,unit:'items',co2e:50,date:new Date(Date.now()-19008e6).toISOString()},
      {id:'31',type:'diet',category:'vegetarian',value:2.8,unit:'kg',co2e:7,date:new Date(Date.now()-19872e6).toISOString()},
      {id:'32',type:'travel',category:'bus',value:40,unit:'km',co2e:3.56,date:new Date(Date.now()-20736e6).toISOString()},
      {id:'33',type:'energy',category:'lpg',value:12,unit:'kg',co2e:18,date:new Date(Date.now()-216e7).toISOString()},
      {id:'34',type:'diet',category:'meat_beef',value:2.5,unit:'kg',co2e:67.5,date:new Date(Date.now()-22464e6).toISOString()},
      {id:'35',type:'travel',category:'walking',value:6,unit:'km',co2e:0,date:new Date(Date.now()-23328e6).toISOString()},
      {id:'36',type:'shopping',category:'clothing',value:3,unit:'items',co2e:30,date:new Date(Date.now()-24192e6).toISOString()},
      {id:'37',type:'energy',category:'electricity',value:88,unit:'kWh',co2e:72.16,date:new Date(Date.now()-25056e6).toISOString()},
      {id:'38',type:'diet',category:'vegan',value:2,unit:'kg',co2e:3,date:new Date(Date.now()-2592e6).toISOString()},
      {id:'39',type:'travel',category:'car_diesel',value:55,unit:'km',co2e:9.41,date:new Date(Date.now()-2592e6).toISOString()},
      {id:'40',type:'shopping',category:'electronics',value:2,unit:'items',co2e:100,date:new Date(Date.now()-2592e6).toISOString()}
    ];
    
    localStorage.setItem('carbon_activities', JSON.stringify(demoData));
    alert('✅ 30-day demo data loaded! Refreshing...');
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h1 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)', margin: 0 }}>
            🌍 Carbon Footprint Tracker
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link 
              to="/log-activity"
              style={{
                background: '#3498db',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600'
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
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              🌍 Carbon Meter
            </Link>

            <Link 
              to="/progress"
              style={{
                background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              📈 Progress & Insights
            </Link>

            <button 
              onClick={loadDemoData}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Load Demo Data
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <AutoCarbonMeter onActivityLogged={onAddActivity} />
        </div>

        <div className="card">
          <Dashboard activities={activities} onDelete={onDeleteActivity} />
        </div>
      </div>
    </>
  );
};

export default HomePage;