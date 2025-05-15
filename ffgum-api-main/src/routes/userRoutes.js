const express = require('express');
const { signIn } = require('../controllers/userController');

const router = express.Router();

router.get('/signIn/:ffRegion/:ffId', signIn);

module.exports = router;
