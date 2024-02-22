import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("sorteio").setDescription("Configurar um sorteio"),
  async execute(interaction: CommandInteraction) {
    const modal = new ModalBuilder().setCustomId("giveaway_setup").setTitle("Configurar Sorteio");

    const giveawayTitleInput = new TextInputBuilder()
      .setCustomId("giveawayTitleInput")
      .setLabel("Qual vai ser o título do sorteio?")
      .setStyle(TextInputStyle.Short);

    const giveawayDescriptionInput = new TextInputBuilder()
      .setCustomId("giveawayDescriptionInput")
      .setLabel("Descrição do sorteio")
      .setStyle(TextInputStyle.Paragraph);

    const giveawayWinnersQuantityInput = new TextInputBuilder()
      .setCustomId("giveawayWinnersQuantityInput")
      .setLabel("Quantas pessoas vão ser sorteadas?")
      .setValue("1")
      .setStyle(TextInputStyle.Short);

    const giveawayDateInput = new TextInputBuilder()
      .setCustomId("giveawayDateInput")
      .setLabel("Quando ocorrerá o sorteio?")
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(giveawayTitleInput);
    const secondActionRow = new ActionRowBuilder().addComponents(giveawayDescriptionInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(giveawayWinnersQuantityInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(giveawayDateInput);
    //@ts-ignore

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    await interaction.showModal(modal);
  },
};
