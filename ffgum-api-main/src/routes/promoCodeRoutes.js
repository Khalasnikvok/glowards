const express = require('express');
const { claimPromoCode } = require('../controllers/promoCodeController');

const router = express.Router();

router.post('/claim', claimPromoCode);

module.exports = router;
