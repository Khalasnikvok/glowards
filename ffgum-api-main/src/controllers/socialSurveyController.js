const SocialSurvey = require('../models/SocialSurvey');
const User = require('../models/User');

const userReward = 10;
const platforms = ["youtube", "instagram", "tiktok"];

const getSocialSurveys = async (req, res) => {
    const { ffId } = req.query;

    try {
        const survey = await SocialSurvey.findAll({ where: { ffId } });
        return res.status(200).json({ survey });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking survey status', error: error.message });
    }
};

const createSocialSurvey = async (req, res) => {
    const { ffId, platform } = req.body;

    if (!platforms.includes(platform)) {
        return res.status(400).json({ message: "La plataforma especificada no es elegible" });
    }

    try {
        const user = await User.findOne({ where: { ffId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const existingSurvey = await SocialSurvey.findOne({ where: { ffId, platform } });
        if (existingSurvey) {
            return res.status(400).json({ message: 'Survey already completed for this platform.' });
        }

        const survey = await SocialSurvey.create({ ffId, platform });

        user.ffCurrency += userReward;
        await user.save();

        return res.status(201).json({
            message: 'Survey completed successfully and user rewarded.',
            survey,
            updatedCurrency: user.ffCurrency,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating survey', error: error.message });
    }
};

module.exports = {
    createSocialSurvey,
    getSocialSurveys,
};
