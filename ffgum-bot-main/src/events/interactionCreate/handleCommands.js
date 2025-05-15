const ms = require("ms");
const { mainServer, roleId } = require("../../../config.json"); 
const getLocalCommands = require("../../utils/getLocalCommands");
const isOnCooldown = require("../../utils/isOnCooldown");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;
    
    if (commandObject.cooldown) {
      const interactionUser = interaction.member.user;
      if (isOnCooldown.onCooldown(interactionUser.id, commandObject.name)) {
        const timeLeft = isOnCooldown.getCooldownLeft(
          interactionUser.id,
          commandObject.name
        );
        interaction.reply({
          content: `This command is on cooldown, you must wait ${ms(timeLeft)} to use it again`,
          ephemeral: true,
        });
        return;
      }
      isOnCooldown.setCooldown(
        interactionUser.id,
        commandObject.name,
        commandObject.cooldown
      );
    }

    if (commandObject.mainServerOnly) {
      if (interaction.guild.id !== mainServer) {
        interaction.reply({
          content: "You cannot use this command here.",
          ephemeral: true,
        });
        return;
      }
    }

    const memberRoles = interaction.member.roles.cache;
    const hasRole = memberRoles.has(roleId);

    if (commandObject.devOnly && !hasRole) {
      interaction.reply({
        content: "You do not have the required role to use this command.",
        ephemeral: true,
      });
      return;
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "You do not have permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I do not have permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(
      `There was an error with the command ${interaction.commandName}: ${error.stack}`
    );
  }
};
