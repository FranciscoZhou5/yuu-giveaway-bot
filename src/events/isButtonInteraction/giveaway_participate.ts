import { ButtonInteraction, CacheType } from "discord.js";
import { supabase } from "../../lib/supabase";

const id = "giveaway_participate";

async function handler(interaction: ButtonInteraction<CacheType>) {
  const username = interaction.user.username;

  const { data } = await supabase.from("giveaway").select("*");

  const userAlreadyParticipate = data?.some((i) => i.user === username);

  if (userAlreadyParticipate) {
    await interaction.reply({
      content: "Você já está participando do sorteio.",
      ephemeral: true,
    });

    return;
  }

  await supabase.from("giveaway").insert({ user: username });

  await interaction.reply({
    content: "Você está participando do sorteio agora!!",
    ephemeral: true,
  });

  return;
}

export { id, handler };
