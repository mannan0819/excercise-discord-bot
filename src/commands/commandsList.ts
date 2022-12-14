import { SlashCommandBuilder } from "discord.js";

export const commandsList = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  new SlashCommandBuilder()
    .setName("default")
    .setDescription("The default plan!"),
  new SlashCommandBuilder()
    .setName("signup")
    .setDescription("Sign up to the workout plan!")
    .addStringOption((option) =>
      option
        .setName("plan")
        .setDescription(
          "Specify your own plan. If you do not want to use the default plan, leave this blank"
        )
    ),
  new SlashCommandBuilder()
    .setName("done")
    .setDescription("Call this command to complete your daily workout!"),
  new SlashCommandBuilder()
    .setName("board")
    .setDescription("Call this command to update the progress board!"),
].map((command) => command.toJSON());
