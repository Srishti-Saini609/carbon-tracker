import express from 'express';
import { createSquad, getSquads, getSquadById, joinSquad } from '../controllers/squadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSquad);
router.get('/', getSquads);
router.get('/:id', getSquadById);
router.post('/:id/join', protect, joinSquad);

export default router;
