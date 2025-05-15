const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/dbHandler");

const SocialSurvey = sequelize.define("SocialSurvey", {
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ffId: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  tableName: "social_surveys",
  timestamps: true, 
});

SocialSurvey.beforeCreate(async (follow) => {
  const existingFollow = await SocialSurvey.findOne({
    where: {
      platform: follow.platform,
      ffId: follow.ffId,
    },
  });

  if (existingFollow) {
    throw new Error('Este usuario ya sigue esta plataforma.');
  }
});

module.exports = SocialSurvey;
