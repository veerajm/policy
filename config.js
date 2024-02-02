const dotenv = require('dotenv');
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  server: {
    port: process.env.PORT,
  },
  reminderService: {
    checkInterval: process.env.REMINDER_CHECK_INTERVAL,
  },
  security: {
    jwtSecret: process.env.JWT_SECRET,
  },
};

module.exports = config;
