const { Client, Intents, MessageEmbed } = require('discord.js'); 
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const config = require('../../config.json'); 

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
});

const createWithdrawal = async (req, res) => {
    const { ffId, ffCurrencyAmount } = req.body; 

    try {
        const user = await User.findOne({ where: { ffId } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (user.ffCurrency < ffCurrencyAmount) {
            return res.status(400).json({ message: 'No tienes suficientes diamantes para realizar este retiro.' });
        }

        const withdrawal = await Withdrawal.create({ ffId, ffCurrencyAmount });

        user.ffCurrency -= ffCurrencyAmount;
        await user.save();

        const channel = await client.channels.fetch(config.channelId); 

        const embed = new MessageEmbed() 
            .setTitle('Nuevo Retiro')
            .addFields(
                { name: 'Cantidad', value: `${ffCurrencyAmount}`, inline: true },
                { name: 'Región', value: `${user.ffRegion}`, inline: true },
                { name: 'FF ID', value: `${ffId}`, inline: true },
                { name: 'Fecha', value: `${new Date().toLocaleString()}`, inline: true },
            )
            .setColor('#00FF00') 
            .setTimestamp();

        await channel.send({ embeds: [embed] });

        return res.status(201).json({ message: 'Retiro creado con éxito.', withdrawal });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el retiro.', error: error.message });
    }
};

const getWithdrawals = async (req, res) => {
    const { ffId } = req.params;

    try {
        const withdrawals = await Withdrawal.findAll({ where: { ffId } });
        return res.status(200).json(withdrawals);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los retiros.', error: error.message });
    }
};

client.login(config.DiscordTOKEN).catch(console.error);

module.exports = {
    createWithdrawal,
    getWithdrawals,
};
