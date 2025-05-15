const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/dbHandler");

const ClaimedPromoCode = sequelize.define("ClaimedPromoCode", {
  ffId: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "claimed_promo_codes",
  timestamps: true, 
});

module.exports = ClaimedPromoCode;
