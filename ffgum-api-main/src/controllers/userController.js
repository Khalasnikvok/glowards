const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');

const regions = [
    { name: "Brasil", code: "BRA" },
    { name: "Pakistán", code: "PAK" },
    { name: "Taiwán", code: "TWN" },
    { name: "Indonesia", code: "IDN" },
    { name: "África", code: "AFR" },
    { name: "Malasia", code: "MYS" },
    { name: "Vietnam", code: "VNM" },
    { name: "India", code: "IND" },
    { name: "Europa", code: "EUR" },
    { name: "Tailandia", code: "THA" },
    { name: "Sudamérica", code: "SAM" },
    { name: "Estados Unidos", code: "USA" },
    { name: "Norteamérica", code: "NAM" },
];

const signIn = async (req, res) => {
    const { ffRegion, ffId } = req.params;

    const validRegion = regions.find(region => region.code === ffRegion);

    if (!validRegion) {
        return res.status(400).json({ message: 'Región no permitida' });
    }

    try {
        let user = await User.findOne({ where: { ffId, ffRegion } });

        if (!user) {
            user = await User.create({ ffId, ffRegion, ffCurrency: 0 });
        }

        const withdrawals = await Withdrawal.findAll({ where: { ffId } });

        return res.status(200).json({ message: 'Usuario encontrado', user, withdrawals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    signIn,
};
