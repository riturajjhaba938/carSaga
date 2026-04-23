const router = require('express').Router();
const { createChat, sendMessage, getChatById } = require('../controllers/chat.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.post('/', createChat);
router.post('/:id/message', sendMessage);
router.get('/:id', getChatById);

module.exports = router;
