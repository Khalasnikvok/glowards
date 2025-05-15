const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/dbHandler");

const Withdrawal = sequelize.define("Withdrawal", {
    ffId: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    ffCurrencyAmount: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
}, {
        tableName: "withdrawals",
        timestamps: true, 
    });

module.exports = Withdrawal;
