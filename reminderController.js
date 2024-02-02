const Reminder = require('../models/reminder.model');

// Get all reminders
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().populate('policy');
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single reminder by ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id).populate('policy');
    if (!reminder) {
      return res.status(404).send({ message: 'Reminder not found' });
    }
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const newReminder = new Reminder({
      policy: req.body.policy,
      reminderDate: req.body.reminderDate,
      message: req.body.message,
      status: req.body.status,
    });
    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update an existing reminder
exports.updateReminder = async (req, res) => {
  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReminder) {
      return res.status(404).send({ message: 'Reminder not found' });
    }
    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!deletedReminder) {
      return res.status(404).send({ message: 'Reminder not found' });
    }
    res.status(200).send({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
