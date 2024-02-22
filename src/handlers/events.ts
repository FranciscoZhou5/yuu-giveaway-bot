import { Client } from "discord.js";

import path from "node:path";
import fs from "node:fs";

export default (client: Client<boolean>) => {
  const eventsPath = path.resolve(__dirname, "..", "events");

  fs.readdirSync(eventsPath).forEach(async (file) => {
    require(path.resolve(eventsPath, file)).default(client);
  });
};
