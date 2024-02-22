import { Client, Collection, REST, Routes } from "discord.js";

import path from "node:path";
import fs from "node:fs";

import chalk from "chalk";

export default (client: Client<boolean>) => {
  const commands = [];
  client.commands = new Collection();

  const foldersPath = path.resolve(__dirname, "..", "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath);

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath).default;

      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

  (async () => {
    try {
      console.log(
        `${chalk.blue("command")} Started refreshing ${commands.length} application (/) commands.`
      );

      const data = (await rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENT_ID!,
          process.env.DISCORD_GUILD_ID!
        ),
        {
          body: commands,
        }
      )) as any[];

      console.log(
        `${chalk.blue("command")} Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  })();
};
