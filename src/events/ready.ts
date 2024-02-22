import { ActivityType, Client, Events } from "discord.js";

import chalk from "chalk";

export default (client: Client<boolean>) => {
  client.once(Events.ClientReady, () => {
    console.log(`${chalk.cyan("info")} Bot ready and logged in as "${client?.user?.tag}"!`);

    client?.user?.setPresence({
      status: "online",
      activities: [{ name: "Sorteios toda semana!", type: ActivityType.Custom }],
    });
  });
};
