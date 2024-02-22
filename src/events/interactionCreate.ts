import { Client, Events } from "discord.js";
import handleButtonInteraction from "./isButtonInteraction";
import handleModalSubmitInteraction from "./isModalSubmitInteraction";

export default (client: Client<boolean>) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isModalSubmit()) {
      const result = handleModalSubmitInteraction(interaction.customId);

      if (result === null) {
        return;
      }

      return result(interaction);
    }

    if (interaction.isButton()) {
      const result = handleButtonInteraction(interaction.customId);

      if (result === null) {
        return;
      }

      return result(interaction);
    }

    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);

      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });
};
