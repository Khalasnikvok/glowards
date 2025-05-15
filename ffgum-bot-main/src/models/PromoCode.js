const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/dbHandler");

const PromoCode = sequelize.define("PromoCode", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  ffCurrencyAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usesLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  timeLimit: {
    type: DataTypes.DATE, 
    allowNull: true, 
  },
}, {
  tableName: "promo_codes",
  timestamps: true, 
});

module.exports = PromoCode;
