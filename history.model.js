const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true,
  },
  changeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  changeDescription: {
    type: String,
    required: true,
    trim: true,
  },
  previousStatus: {
    type: String,
    required: true,
    enum: ['Active', 'Expired', 'Cancelled'],
  },
  newStatus: {
    type: String,
    required: true,
    enum: ['Active', 'Expired', 'Cancelled'],
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
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
historySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

historySchema.pre('updateOne', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('History', historySchema);
