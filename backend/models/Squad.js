import mongoose from 'mongoose';

const squadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  targetValue: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: '🌿'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Squad', squadSchema);
