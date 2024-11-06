const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
