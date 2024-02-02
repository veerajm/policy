const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Route to get all policies
router.get('/', policyController.getAllPolicies);

// Route to get a single policy by its policyNumber
router.get('/:policyNumber', policyController.getPolicyByNumber);

// Route to create a new policy
router.post('/', policyController.createPolicy);

// Route to update an existing policy
router.put('/:policyNumber', policyController.updatePolicy);

// Route to delete a policy
router.delete('/:policyNumber', policyController.deletePolicy);

// Route to get the history of a policy
router.get('/:policyNumber/history', policyController.getPolicyHistory);

// Route to set a reminder for a policy
router.post('/:policyNumber/reminders', policyController.setPolicyReminder);

module.exports = router;
