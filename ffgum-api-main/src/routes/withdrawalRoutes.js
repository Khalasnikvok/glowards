const express = require('express');
const { createWithdrawal, getWithdrawals } = require('../controllers/withdrawalController');

const router = express.Router();

router.post('/', createWithdrawal);
router.get('/:ffId', getWithdrawals);

module.exports = router;
