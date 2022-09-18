import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { exampleEmbed, exampleEmbed2 } from "./components/embedForm";
import dayjs from "dayjs";
import { getLocalTime } from "./utils/date-utils";
import runEvery from "./utils/runEvery";
import { registerCommands } from "./utils/command-builder";
import { commands } from "./utils/commands";
dotenv.config();

console.log("Bot is starting...");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const main = async () => {
  await client.login(process.env.DISCORD_BOT_TOKEN);
  await registerCommands();
  commands(client);
  console.log(client.user?.username);
  const channel = await client.channels.fetch(process.env.CHANNEL_ID!);
  if (!channel || !channel.isTextBased()) return;
  // channel.send({ embeds: [exampleEmbed2] });

  channel.send("Hello world!");
  channel.send("The time is " + getLocalTime("America/Toronto"));
  console.log();
  channel.awaitMessages().then((collected) => {
    console.log(collected);
  });

  channel.lastMessage?.react("👍");

  runEvery(() => {
    channel.send("The time is " + getLocalTime("America/Toronto"));
  });
};
main();
