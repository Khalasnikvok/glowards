const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/dbHandler");

const User = sequelize.define("User", {
  ffId: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
  },
  ffCurrency: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  ffRegion: { 
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
