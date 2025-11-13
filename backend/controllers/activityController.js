import Activity from "../models/activityModel.js";

// Get all user activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

// Add a new activity
export const addActivity = async (req, res) => {
  const { type, description, carbonEmission } = req.body;

  try {
    const newActivity = new Activity({
      user: req.user.id,
      type,
      description,
      carbonEmission,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error });
  }
};
