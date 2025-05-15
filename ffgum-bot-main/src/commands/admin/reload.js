const { mainServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = {
  name: "reload",
  description: "Recarga manualmente un solo comando del bot.",
  devOnly: true,
  options: [
    {
      name: "command",
      description: "Nombre del comando a recargar.",
      type: "STRING",
      required: true,
    },
  ],
  callback: async(client, interaction) => {
    try {
      const commandName = interaction.options.getString("command");
      await interaction.deferReply({ ephemeral: true });

      const localCommands = getLocalCommands();
      const applicationCommands = await getApplicationCommands(client, mainServer);

      const localCommand = localCommands.find((cmd) => cmd.name === `${commandName}.js`);
      if (!localCommand) {
        return await interaction.editReply(`No se encontró el comando "${commandName}".`);
      }

      const existingCommand = applicationCommands.cache.find((cmd) => cmd.name === commandName);
      if (!existingCommand) {
        return await interaction.editReply(`El comando "${commandName}" no está registrado en Discord.`);
      }

      if (localCommand.deleted) {
        await applicationCommands.delete(existingCommand.id);
        return await interaction.editReply(`El comando "${commandName}" ha sido eliminado.`);
      }

      if (areCommandsDifferent(existingCommand, localCommand)) {
        await applicationCommands.edit(existingCommand.id, {
          description: localCommand.description,
          options: localCommand.options,
        });
        return await interaction.editReply(`El comando "${commandName}" se ha editado correctamente.`);
      }

      await interaction.editReply(`El comando "${commandName}" no necesita ser recargado.`);
    } catch (error) {
      console.error(`Hubo un error al recargar el comando: ${error}`);
      await interaction.editReply("Hubo un error al recargar el comando. Por favor, revisa el registro del bot para más detalles.");
    }
  },
};
