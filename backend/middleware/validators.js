export const VALID_TYPES = ['travel', 'energy', 'diet', 'shopping'];

export const VALID_CATEGORIES = {
  travel: ['car_petrol', 'car_diesel', 'bus', 'train', 'flight_domestic', 'walking', 'cycling'],
  energy: ['electricity', 'natural_gas', 'lpg'],
  diet: ['meat_beef', 'meat_chicken', 'vegetarian', 'vegan'],
  shopping: ['clothing', 'electronics'],
};

export const validateActivity = (req, res, next) => {
  const { type, category, value, unit, co2e } = req.body;

  if (!type || !category || value === undefined || !unit || co2e === undefined) {
    res.status(400);
    throw new Error('Please provide type, category, value, unit, and co2e');
  }

  if (!VALID_TYPES.includes(type)) {
    res.status(400);
    throw new Error(`Invalid activity type. Must be one of: ${VALID_TYPES.join(', ')}`);
  }

  if (!VALID_CATEGORIES[type]?.includes(category)) {
    res.status(400);
    throw new Error(`Invalid category for type '${type}'. Must be one of: ${VALID_CATEGORIES[type].join(', ')}`);
  }

  const numValue = parseFloat(value);
  const numCo2e = parseFloat(co2e);

  if (isNaN(numValue) || numValue < 0) {
    res.status(400);
    throw new Error('Value must be a non-negative number');
  }

  if (isNaN(numCo2e) || numCo2e < 0) {
    res.status(400);
    throw new Error('CO2e must be a non-negative number');
  }

  next();
};
