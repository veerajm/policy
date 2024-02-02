const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true,
    trim: true,
  },
  policyHolder: {
    type: String,
    required: true,
    trim: true,
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Expired', 'Cancelled'],
    default: 'Active',
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
policySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

policySchema.pre('updateOne', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Policy', policySchema);
