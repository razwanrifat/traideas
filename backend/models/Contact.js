const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true },
  normalizedPhone: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
