const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const Article = sequelize.define('Article', {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  aka: {
    type: DataTypes.STRING,
  },
  actor: {
    type: DataTypes.STRING,
  },
  signature: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  rerelease: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movieType: {
    type: DataTypes.STRING,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agency: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sku: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  skuLetter: {
    type: DataTypes.STRING(1),
    validate: {
      isIn: [['C', 'L', 'O', 'P']],
    },
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movieNumber: {
    type: DataTypes.STRING(12),
    unique: true,
  },
})

module.exports = Article
