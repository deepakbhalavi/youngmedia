const express = require('express');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Get all messages
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.json({ success: true, data: messages, total: messages.length });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Update status
router.put('/:id', protect, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: Delete
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
