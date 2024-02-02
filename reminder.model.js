const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true,
  },
  reminderDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to handle the update of "updatedAt" field
reminderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

reminderSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Reminder', reminderSchema);
