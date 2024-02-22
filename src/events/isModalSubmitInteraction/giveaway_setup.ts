import { ButtonStyle, CacheType, ComponentType, ModalSubmitInteraction, time } from "discord.js";
import { supabase } from "../../lib/supabase";
import { GiveawaySetupData } from "../../types/GiveawaySetupData";
import chalk from "chalk";
import { scheduleJob } from "node-schedule";

function scheduleGiveaway(interaction: ModalSubmitInteraction<CacheType>, date: Date) {
  scheduleJob(date, async () => {
    const channel = interaction.guild?.channels.cache.get("1196497340543013024");

    if (!channel) {
      return;
    }

    if (channel.isTextBased()) {
      await channel.send("Sorteio realizado!");

      // const date = new Date();
      // date.setMinutes(35);
      // schedule.scheduleJob(date, async () => {
      // });
    }
  });
}

const id = "giveaway_setup";

async function handler(interaction: ModalSubmitInteraction<CacheType>) {
  const title = interaction.fields.getTextInputValue("giveawayTitleInput");
  const description = interaction.fields.getTextInputValue("giveawayDescriptionInput");
  const quantity = interaction.fields.getTextInputValue("giveawayWinnersQuantityInput");
  const inputDate = interaction.fields.getTextInputValue("giveawayDateInput");

  const [datePart, hourPart] = inputDate.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = hourPart.split(":");

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

  const { id: replyMessageId } = await interaction.reply({
    content: `O sorteio acontecerá em ${inputDate}(${time(date, "R")})`,
    fetchReply: true,
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

  const { error, statusText, status } = await supabase.from("sorteios").insert<GiveawaySetupData>({
    winner_quantity: +quantity,
    participants: JSON.stringify([]),
    message_id: replyMessageId,
    description,
    title,
    winner: "",
    date,
  });

  if (error) {
    console.log({ error, status, statusText });

    return;
  }

  console.log(`${chalk.cyan("info")} Created sucessfully "${title}"!`);
  scheduleGiveaway(interaction, date);

  return;
}

export { id, handler };
