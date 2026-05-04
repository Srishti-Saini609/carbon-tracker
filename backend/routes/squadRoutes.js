const express = require('express');
const router = express.Router();
const squadController = require('../controllers/squadController');
const auth = require('../middleware/auth');

router.post('/', auth, squadController.createSquad);
router.get('/', squadController.getSquads);
router.get('/:id', squadController.getSquadById);
router.post('/:id/join', auth, squadController.joinSquad);

module.exports = router;
