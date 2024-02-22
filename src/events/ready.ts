import { ActivityType, Client, Events } from "discord.js";

import chalk from "chalk";
import schedule from "node-schedule";

export default (client: Client<boolean>) => {
  client.once(Events.ClientReady, async (interaction) => {
    console.log(`${chalk.cyan("info")} Bot ready and logged in as "${client?.user?.tag}"!`);

    client?.user?.setPresence({
      status: "online",
      activities: [{ name: "[Yuu] Sorteios toda semana!", type: ActivityType.Custom }],
    });

    const channel = interaction.channels.cache.get("1196497340543013024");

    if (!channel) {
      return;
    }

    if (channel.isTextBased()) {
      // const date = new Date();
      // date.setMinutes(35);
      // schedule.scheduleJob(date, async () => {
      //   await channel.send("Teste");
      // });
    }
  });
};
