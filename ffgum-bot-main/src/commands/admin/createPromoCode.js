const { MessageEmbed } = require("discord.js");
const PromoCode = require("../../models/PromoCode");
const dayjs = require("dayjs");

module.exports = {
    name: "promocode",
    description: "[ADMIN] Create a promocode",
    devOnly: true,
    options: [
        {
            name: "code",
            description: "The promocode code",
            type: "STRING",
            required: true,
        },
        {
            name: "currency",
            description: "The promocode currency",
            type: "INTEGER",
            required: true,
        },
        {
            name: "uses-limit",
            description: "The amount of times it can be used",
            type: "INTEGER",
            required: false,
        },
        {
            name: "time-limit",
            description: "The expiration time in format YYYY-MM-DD HH:MM",
            type: "STRING",
            required: false,
        },
    ],

    callback: async (client, interaction) => {
        const code = interaction.options.getString("code");
        const currency = interaction.options.getInteger("currency");
        const usesLimit = interaction.options.getInteger("uses-limit");
        const timeLimit = interaction.options.getString("time-limit");

        try {
            const existingPromoCode = await PromoCode.findOne({ where: { code } });

            if (existingPromoCode) {
                return interaction.reply({
                    content: `Promo code **${code}** already exists.`,
                    ephemeral: true,
                });
            }
 
                let expirationDate;

            if (timeLimit) {
                expirationDate = dayjs(timeLimit).toDate();

                if (!expirationDate || isNaN(expirationDate)) {
                    return interaction.reply({
                        content: "Invalid date format. Please use YYYY-MM-DD HH:MM.",
                        ephemeral: true,
                    });
                }
            }

            const newPromoCode = await PromoCode.create({
                code,
                ffCurrencyAmount: currency,
                usesLimit,
                timeLimit: expirationDate, 
            });

            const embed = new MessageEmbed()
            .setTitle("Promo Code Created")
            .setDescription(`Promo code **${newPromoCode.code}** created successfully.`)
            .addField("Currency", `${newPromoCode.ffCurrencyAmount}`)
            .addField("Uses Limit", `${newPromoCode.usesLimit}`)
            .addField("Expires At", `${newPromoCode.timeLimit ? dayjs(newPromoCode.timeLimit).format("YYYY-MM-DD HH:mm") : "Never" }`)
            .setColor("GREEN");

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Error creating promo code:", error);
            await interaction.reply({ content: "Error creating the promo code.", ephemeral: true });
        }
    },
};
