const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Route to get all reminders
router.get('/', reminderController.getAllReminders);

// Route to get a single reminder by ID
router.get('/:id', reminderController.getReminderById);

// Route to create a new reminder
router.post('/', reminderController.createReminder);

// Route to update an existing reminder
router.put('/:id', reminderController.updateReminder);

// Route to delete a reminder
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;
