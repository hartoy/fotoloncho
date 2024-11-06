const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const LoginInfo = sequelize.define(
  'login_info',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'login_info',
    timestamps: false,
  }
)

module.exports = LoginInfo
