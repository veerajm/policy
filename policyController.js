const Policy = require('../models/policy.model');
const policyService = require('../services/policyService');
const dateHelper = require('../utils/dateHelper');

exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPolicyByNumber = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const policy = await Policy.findOne({ policyNumber: policyNumber });
    if (!policy) {
      return res.status(404).send('Policy not found');
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPolicy = async (req, res) => {
  try {
    const newPolicy = new Policy(req.body);
    await newPolicy.save();
    res.status(201).send('Policy created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const updates = req.body;
    const policy = await Policy.findOneAndUpdate({ policyNumber: policyNumber }, updates, { new: true });
    if (!policy) {
      return res.status(404).send('Policy not found');
    }
    res.status(200).send('Policy updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePolicy = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const policy = await Policy.findOneAndDelete({ policyNumber: policyNumber });
    if (!policy) {
      return res.status(404).send('Policy not found');
    }
    res.status(200).send('Policy deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPolicyHistory = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const history = await policyService.getPolicyHistory(policyNumber);
    if (!history) {
      return res.status(404).send('History not found');
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.setPolicyReminder = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const reminderDate = req.body.reminderDate;
    if (!dateHelper.isValidDate(reminderDate)) {
      return res.status(400).send('Invalid date format');
    }
    const reminder = await policyService.setReminder(policyNumber, reminderDate);
    if (!reminder) {
      return res.status(404).send('Policy not found');
    }
    res.status(200).send('Reminder set successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
