import express from 'express';
import { 
  getActivities, 
  addActivity, 
  deleteActivity, 
  getStats 
} from '../controllers/activityController.js';

const router = express.Router();

router.get('/', getActivities);
router.post('/', addActivity);
router.delete('/:id', deleteActivity);
router.get('/stats', getStats);

export default router;