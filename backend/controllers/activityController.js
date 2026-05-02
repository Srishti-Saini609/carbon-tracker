import expressAsyncHandler from 'express-async-handler';
import Activity from '../models/Activity.js';

import { VALID_TYPES, VALID_CATEGORIES } from '../middleware/validators.js';


// @desc    Get all activities for logged-in user
// @route   GET /api/activities
// @access  Private
export const getActivities = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  const [activities, total] = await Promise.all([
    Activity.find({ user: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Activity.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    activities,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Add a single activity
// @route   POST /api/activities
// @access  Private
export const addActivity = expressAsyncHandler(async (req, res) => {
  const { type, category, value, unit, co2e, date } = req.body;

  const numValue = parseFloat(value);
  const numCo2e = parseFloat(co2e);


  const activity = await Activity.create({
    user: req.user._id,
    type,
    category,
    value: numValue,
    unit: unit.trim(),
    co2e: numCo2e,
    date: date || new Date(),
  });

  res.status(201).json(activity);
});

// @desc    Add bulk activities
// @route   POST /api/activities/bulk
// @access  Private
export const addBulkActivities = expressAsyncHandler(async (req, res) => {
  if (!Array.isArray(req.body)) {
    res.status(400);
    throw new Error('Expected an array of activities');
  }

  if (req.body.length > 50) {
    res.status(400);
    throw new Error('Maximum 50 activities per bulk request');
  }

  const activitiesData = req.body.map(act => {
    const { type, category, value, unit, co2e, date } = act;

    if (!type || !category || value === undefined || !unit || co2e === undefined) {
      throw new Error('Each activity must have type, category, value, unit, and co2e');
    }

    return {
      user: req.user._id,
      type,
      category,
      value: parseFloat(value),
      unit: unit.trim(),
      co2e: parseFloat(co2e),
      date: date || new Date(),
    };
  });

  const activities = await Activity.insertMany(activitiesData);
  res.status(201).json(activities);
});

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private
export const deleteActivity = expressAsyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  
  if (!activity) {
    res.status(404);
    throw new Error('Activity not found');
  }

  // Check user owns the activity — 403 Forbidden, not 401
  if (activity.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this activity');
  }

  await activity.deleteOne();
  res.json({ message: 'Activity deleted' });
});

// @desc    Get user stats
// @route   GET /api/activities/stats
// @access  Private
export const getStats = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [totalResult, byType] = await Promise.all([
    Activity.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$co2e' }, count: { $sum: 1 } } },
    ]),
    Activity.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$type', total: { $sum: '$co2e' }, count: { $sum: 1 } } },
    ]),
  ]);

  res.json({
    totalCO2e: totalResult[0]?.total || 0,
    totalActivities: totalResult[0]?.count || 0,
    byType: byType.reduce((acc, item) => {
      acc[item._id] = { total: item.total, count: item.count };
      return acc;
    }, {}),
  });
});