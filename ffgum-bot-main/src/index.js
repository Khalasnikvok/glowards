require('dotenv').config();
const { Client, Intents } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { TOKEN } = require('../config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
});

eventHandler(client);

client.login(TOKEN);
