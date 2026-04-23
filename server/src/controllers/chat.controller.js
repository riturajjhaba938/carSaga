const Chat = require('../models/Chat.model');

// POST /api/chat
exports.createChat = async (req, res, next) => {
  try {
    const chat = await Chat.create({ user: req.user.id, report: req.body.reportId, messages: [] });
    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

// POST /api/chat/:id/message
exports.sendMessage = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    // Add user message
    chat.messages.push({ role: 'user', text: req.body.text });

    // TODO: Replace with real AI integration (OpenAI / Gemini)
    const botReply = 'Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate.';
    chat.messages.push({ role: 'bot', text: botReply });

    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};

// GET /api/chat/:id
exports.getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('report');
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};
