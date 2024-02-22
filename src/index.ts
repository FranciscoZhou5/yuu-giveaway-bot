import "./env";

import { Client, GatewayIntentBits, Partials } from "discord.js";

import fs from "node:fs";
import path from "node:path";

function loadHandlers(client: Client<boolean>) {
  const handlersPath = path.resolve(__dirname, "handlers");
  const handlers = fs.readdirSync(handlersPath);

  handlers.forEach((file) => {
    require(path.resolve(handlersPath, file)).default(client);
  });
}

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
  ],
  partials: [Partials.Channel],
});

loadHandlers(client);

client.login(process.env.DISCORD_TOKEN);
