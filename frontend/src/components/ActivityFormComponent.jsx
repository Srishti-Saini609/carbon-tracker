import { useState } from 'react';

const ActivityFormComponent = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'travel',
    category: 'car_petrol',
    value: '',
    unit: 'km'
  });

  const categories = {
    travel: [
      { value: 'car_petrol', label: 'Car (Petrol)' },
      { value: 'car_diesel', label: 'Car (Diesel)' },
      { value: 'bus', label: 'Bus' },
      { value: 'train', label: 'Train' },
      { value: 'flight_domestic', label: 'Flight (Domestic)' },
      { value: 'walking', label: 'Walking' },
      { value: 'cycling', label: 'Cycling' }
    ],
    energy: [
      { value: 'electricity', label: 'Electricity' },
      { value: 'natural_gas', label: 'Natural Gas' },
      { value: 'lpg', label: 'LPG' }
    ],
    diet: [
      { value: 'meat_beef', label: 'Beef' },
      { value: 'meat_chicken', label: 'Chicken' },
      { value: 'vegetarian', label: 'Vegetarian Meal' },
      { value: 'vegan', label: 'Vegan Meal' }
    ],
    shopping: [
      { value: 'clothing', label: 'Clothing Item' },
      { value: 'electronics', label: 'Electronics' }
    ]
  };

  const units = { travel: 'km', energy: 'kWh', diet: 'kg/meal', shopping: 'items' };

  const emissionFactors = {
    travel: { car_petrol: 0.192, car_diesel: 0.171, bus: 0.089, train: 0.041, flight_domestic: 0.255, walking: 0, cycling: 0 },
    energy: { electricity: 0.82, natural_gas: 2.0, lpg: 1.5 },
    diet: { meat_beef: 27.0, meat_chicken: 6.9, vegetarian: 2.5, vegan: 1.5 },
    shopping: { clothing: 10.0, electronics: 50.0 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const co2e = parseFloat((formData.value * emissionFactors[formData.type][formData.category]).toFixed(3));
    
    const activity = {
      id: Date.now().toString(),
      ...formData,
      value: parseFloat(formData.value),
      co2e,
      date: new Date().toISOString()
    };

    onAdd(activity);
    if (onCancel) onCancel();
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>📝 Log New Activity</h2>
      
      <form onSubmit={handleSubmit}>
        <label className="label">Activity Type</label>
        <select 
          className="input"
          value={formData.type}
          onChange={(e) => setFormData({ 
            ...formData, 
            type: e.target.value,
            category: categories[e.target.value][0].value
          })}
        >
          <option value="travel">Travel</option>
          <option value="energy">Energy</option>
          <option value="diet">Diet</option>
          <option value="shopping">Shopping</option>
        </select>

        <label className="label">Category</label>
        <select 
          className="input"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories[formData.type].map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <label className="label">Value ({units[formData.type]})</label>
        <input
          type="number"
          className="input"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          required
          min="0"
          step="0.1"
          placeholder={`Enter ${units[formData.type]}`}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button type="submit" className="btn" style={{ flex: 1 }}>
            ✅ Add Activity
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ActivityFormComponent;