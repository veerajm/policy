/**
 * dateHelper.js
 * Utility functions for handling dates within the document policy manager.
 */

const moment = require('moment');

/**
 * Formats a date into a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Calculates the number of days until a given date.
 * @param {Date} date - The date to calculate the days until.
 * @returns {number} - The number of days until the given date.
 */
function daysUntil(date) {
  const now = moment();
  const targetDate = moment(date);
  return targetDate.diff(now, 'days');
}

/**
 * Checks if a given date is in the past.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is in the past, false otherwise.
 */
function isPast(date) {
  return moment().isAfter(date);
}

/**
 * Adds days to a given date.
 * @param {Date} date - The date to add days to.
 * @param {number} days - The number of days to add.
 * @returns {Date} - The new date with the days added.
 */
function addDays(date, days) {
  return moment(date).add(days, 'days').toDate();
}

module.exports = {
  formatDate,
  daysUntil,
  isPast,
  addDays,
};
