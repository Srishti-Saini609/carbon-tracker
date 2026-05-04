import Squad from '../models/Squad.js';

export const createSquad = async (req, res) => {
  try {
    const { name, description, goal, targetValue, image } = req.body;
    const squad = new Squad({
      name,
      description,
      goal,
      targetValue,
      image,
      creator: req.user.id,
      members: [req.user.id]
    });
    await squad.save();
    res.status(201).json(squad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSquads = async (req, res) => {
  try {
    const squads = await Squad.find().populate('creator', 'name').populate('members', 'name');
    res.json(squads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSquadById = async (req, res) => {
  try {
    const squad = await Squad.findById(req.params.id)
      .populate('creator', 'name')
      .populate('members', 'name')
      .populate({
        path: 'activities',
        populate: { path: 'user', select: 'name' }
      });
    if (!squad) return res.status(404).json({ message: 'Squad not found' });
    res.json(squad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinSquad = async (req, res) => {
  try {
    const squad = await Squad.findById(req.params.id);
    if (!squad) return res.status(404).json({ message: 'Squad not found' });
    
    if (squad.members.some(member => member._id.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Already a member' });
    }
    
    squad.members.push(req.user.id);
    await squad.save();
    res.json(squad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
