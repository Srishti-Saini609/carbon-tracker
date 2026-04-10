import Activity from '../models/Activity.js';

export const getActivities = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const activities = await Activity.find({ deviceId }).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const totalCO2e = await Activity.aggregate([
      { $match: { deviceId } },
      { $group: { _id: null, total: { $sum: '$co2e' } } }
    ]);
    
    const byType = await Activity.aggregate([
      { $match: { deviceId } },
      { $group: { _id: '$type', total: { $sum: '$co2e' } } }
    ]);

    res.json({
      totalCO2e: totalCO2e[0]?.total || 0,
      byType: byType.reduce((acc, item) => {
        acc[item._id] = item.total;
        return acc;
      }, {})
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};