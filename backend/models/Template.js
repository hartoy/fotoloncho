const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const Template = sequelize.define(
  'Template',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    template_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_title_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    red_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_block: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    payment_block: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ship_info: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ship_time: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    condition_block: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
)

module.exports = Template
