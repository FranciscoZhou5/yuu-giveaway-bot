import { ButtonInteraction, CacheType, codeBlock } from "discord.js";
import { supabase } from "../../lib/supabase";
import { GiveawayData } from "../../types/GiveawayData";

const id = "giveaway_participate";

async function handler(interaction: ButtonInteraction<CacheType>) {
  const username = interaction.user.username;
  const messageId = interaction.message.id;

  // const { data } = await supabase.from("giveaway").select("*");

  const { data, error } = await supabase.from("sorteios").select("*").eq("message_id", messageId);

  if (!data || data.length === 0) {
    await interaction.reply({
      content: `Algo deu errado e não foi possível participar do sorteio. Contante algum moderador. Erro: ${codeBlock(
        "Não foi possível localizar o sorteio com o ID."
      )}`,
      ephemeral: true,
    });

    return;
  }

  const giveawayData = data[0] as GiveawayData;
  const participants: string[] = JSON.parse(giveawayData.participants);

  const userAlreadyParticipate = participants?.some((i) => i === username);

  if (userAlreadyParticipate) {
    await interaction.reply({
      content: "Você já está participando do sorteio.",
      ephemeral: true,
    });

    return;
  }

  participants.push(username);

  await supabase
    .from("sorteios")
    .update({ participants: JSON.stringify(participants) })
    .eq("message_id", messageId);

  // if (userAlreadyParticipate) {
  //   await interaction.reply({
  //     content: "Você já está participando do sorteio.",
  //     ephemeral: true,
  //   });

  //   return;
  // }

  // await supabase.from("giveaway").insert({ user: username });

  await interaction.reply({
    content: "Você está participando do sorteio agora!!",
    ephemeral: true,
  });

  return;
}

export { id, handler };
