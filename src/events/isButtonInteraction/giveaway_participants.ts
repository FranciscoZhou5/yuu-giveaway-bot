import { ButtonInteraction, CacheType } from "discord.js";
import { supabase } from "../../lib/supabase";

const id = "giveaway_participants";

async function handler(interaction: ButtonInteraction<CacheType>) {
  const { data } = await supabase.from("giveaway").select("*");

  await interaction.reply({
    ephemeral: true,
    content: [
      "Lista de todos os participantes do sorteio:",
      data?.map((i) => i.user).join("\n"),
    ].join("\n"),
  });

  return;
}

export { id, handler };
