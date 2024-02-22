import { ButtonInteraction, CacheType, codeBlock } from "discord.js";
import { supabase } from "../../lib/supabase";
import { GiveawayData } from "../../types/GiveawayData";

const id = "giveaway_participants";

async function handler(interaction: ButtonInteraction<CacheType>) {
  const messageId = interaction.message.id;

  const { data, error } = await supabase.from("sorteios").select("*").eq("message_id", messageId);

  if (!data || data.length === 0) {
    await interaction.reply({
      content: `Algo deu errado e não foi possível mostrar os participantes do sorteio. Contante algum moderador. Erro: ${codeBlock(
        "Não foi possível localizar o sorteio com o ID."
      )}`,
      ephemeral: true,
    });

    return;
  }

  const giveawayData = data[0] as GiveawayData;
  const participants: string[] = JSON.parse(giveawayData.participants);

  await interaction.reply({
    ephemeral: true,
    content: ["Lista de todos os participantes do sorteio:", participants.join("\n")].join("\n"),
  });

  return;
}

export { id, handler };
