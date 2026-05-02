import { useState } from 'react';

const ActivityFormComponent = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'travel',
    category: 'car_petrol',
    value: '',
    unit: 'km'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numValue = parseFloat(formData.value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Please enter a valid positive number');
      return;
    }
    
    const co2e = parseFloat((numValue * emissionFactors[formData.type][formData.category]).toFixed(3));
    
    // Don't send client-side ID — let the backend generate it
    const activity = {
      type: formData.type,
      category: formData.category,
      value: numValue,
      unit: units[formData.type],
      co2e,
      date: new Date().toISOString()
    };

    try {
      setSubmitting(true);
      await onAdd(activity);
      if (onCancel) onCancel();
    } catch (err) {
      setError(err.message || 'Failed to add activity');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate preview CO2e
  const previewCo2e = formData.value 
    ? (parseFloat(formData.value) * emissionFactors[formData.type][formData.category]).toFixed(2)
    : null;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">📝 Log New Activity</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm text-center font-medium fade-in-up" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="activity-type" className="block text-sm font-semibold text-gray-700 mb-2">Activity Type</label>
          <select 
            id="activity-type"
            className="input-field"
            value={formData.type}
            onChange={(e) => setFormData({ 
              ...formData, 
              type: e.target.value,
              category: categories[e.target.value][0].value
            })}
          >
            <option value="travel">🚗 Travel</option>
            <option value="energy">⚡ Energy</option>
            <option value="diet">🍽️ Diet</option>
            <option value="shopping">🛍️ Shopping</option>
          </select>
        </div>

        <div>
          <label htmlFor="activity-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select 
            id="activity-category"
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories[formData.type].map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="activity-value" className="block text-sm font-semibold text-gray-700 mb-2">
            Value ({units[formData.type]})
          </label>
          <input
            id="activity-value"
            type="number"
            className="input-field"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            required
            min="0.01"
            step="0.1"
            placeholder={`Enter ${units[formData.type]}`}
          />
        </div>

        {/* CO2e Preview */}
        {previewCo2e && parseFloat(previewCo2e) >= 0 && (
          <div className="bg-gray-50 p-4 rounded-xl text-center fade-in-up">
            <p className="text-sm text-gray-500 mb-1">Estimated CO₂e</p>
            <p className={`text-2xl font-bold ${parseFloat(previewCo2e) === 0 ? 'text-green-500' : 'text-orange-500'}`}>
              {previewCo2e} <span className="text-sm font-normal text-gray-400">kg</span>
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin-slow inline-block"></span>
                Adding...
              </span>
            ) : (
              '✅ Add Activity'
            )}
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200"
              disabled={submitting}
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