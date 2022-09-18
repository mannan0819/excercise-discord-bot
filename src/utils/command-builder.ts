import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
].map((command) => command.toJSON());

export const registerCommands = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;

  const rest = new REST({ version: "10" }).setToken(token ?? "");
  await rest
    .put(Routes.applicationGuildCommands(clientId ?? "", guildId ?? ""), {
      body: commands,
    })
    .then((data: any) =>
      console.log(
        `Successfully registered ${data.length} application commands.`
      )
    )
    .catch(console.error);
};
