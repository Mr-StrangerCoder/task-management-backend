const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync('./ca.pem'), 
        rejectUnauthorized: false
      }
    }
  }
);

sequelize.sync({ alter: true })  // creates/updates tables automatically
  .then(() => {
    console.log('✅ Database connected & tables synced');
  })
  .catch(err => {
    console.error('❌ DB error:', err.message);
  });

module.exports = sequelize;