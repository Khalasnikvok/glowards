const express = require("express");
const { createSocialSurvey, getSocialSurveys } = require("../controllers/socialSurveyController");

const router = express.Router();

router.post("/", createSocialSurvey);
router.get("/", getSocialSurveys);

module.exports = router;
