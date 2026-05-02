import express from 'express';
import { 
  getActivities, 
  addActivity, 
  addBulkActivities,
  deleteActivity, 
  getStats 
} from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateActivity } from '../middleware/validators.js';

const router = express.Router();

// IMPORTANT: /stats MUST come before /:id to avoid route shadowing
router.get('/stats', protect, getStats);

router.route('/').get(protect, getActivities).post(protect, validateActivity, addActivity);

router.post('/bulk', protect, addBulkActivities);
router.route('/:id').delete(protect, deleteActivity);

export default router;