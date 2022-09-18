import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { commandsList } from "./commandsList";

export const registerCommands = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;

  const rest = new REST({ version: "10" }).setToken(token ?? "");
  await rest
    .put(Routes.applicationGuildCommands(clientId ?? "", guildId ?? ""), {
      body: commandsList,
    })
    .then((data: any) =>
      console.log(
        `Successfully registered ${data.length} application commands.`
      )
    )
    .catch(console.error);
};
