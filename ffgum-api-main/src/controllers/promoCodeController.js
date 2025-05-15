const PromoCode = require('../models/PromoCode');
const ClaimedPromoCode = require('../models/ClaimedPromoCode');
const User = require('../models/User');

const claimPromoCode = async (req, res) => {
    const { ffId, code } = req.body;

    const promoCode = await PromoCode.findOne({ where: { code } });
    if (!promoCode) {
        return res.status(404).json({ message: 'Código promocional no encontrado.' });
    }

    if (promoCode.usesLimit <= 0) {
        return res.status(400).json({ message: 'El código promocional ha alcanzado su límite de usos.' });
    }

    if (promoCode.timeLimit && promoCode.timeLimit < new Date()) {
        return res.status(400).json({ message: 'El código promocional ha expirado.' });
    }

    const claimedCode = await ClaimedPromoCode.findOne({ where: { ffId, code } });
    if (claimedCode) {
        return res.status(400).json({ message: 'Ya has reclamado este código promocional.' });
    }

    const user = await User.findOne({ where: { ffId } });
    user.ffCurrency += promoCode.ffCurrencyAmount;
    user.save();

    await ClaimedPromoCode.create({ ffId, code });
    promoCode.usesLimit -= 1;
    await promoCode.save();

    return res.status(200).json({ message: 'Código promocional reclamado con éxito.', ffCurrencyAmount: promoCode.ffCurrencyAmount });
};

module.exports = {
    claimPromoCode,
};
