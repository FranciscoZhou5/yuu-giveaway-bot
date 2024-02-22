import { ButtonStyle, CacheType, ComponentType, ModalSubmitInteraction, time } from "discord.js";

const id = "giveaway_setup";

async function handler(interaction: ModalSubmitInteraction<CacheType>) {
  const title = interaction.fields.getTextInputValue("giveawayTitleInput");
  const description = interaction.fields.getTextInputValue("giveawayDescriptionInput");
  const quantity = interaction.fields.getTextInputValue("giveawayWinnersQuantityInput");
  const inputDate = interaction.fields.getTextInputValue("giveawayDateInput");

  console.log({ title, description, quantity, date: inputDate });

  const [datePart, hourPart] = inputDate.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = hourPart.split(":");

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

  await interaction.reply({
    content: `O sorteio acontecerá em ${inputDate}(${time(date, "R")})`,
    embeds: [
      {
        title,
        description,
        image: {
          url: "https://i.pinimg.com/originals/1d/c4/51/1dc451cfaa983266c9d02f39f1970f41.gif",
        },
        color: 0x7159c1,
      },
    ],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            style: ButtonStyle.Primary,
            label: `Participar`,
            custom_id: `giveaway_participate`,
            disabled: false,
            type: ComponentType.Button,
          },
          {
            style: ButtonStyle.Secondary,
            label: `Participantes`,
            custom_id: `giveaway_participants`,
            disabled: false,
            type: ComponentType.Button,
          },
        ],
      },
    ],
  });

  return;
}

export { id, handler };
