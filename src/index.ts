import * as dotenv from "dotenv";
import { Client } from "discord.js";
import { exampleEmbed, exampleEmbed2 } from "./components/embedForm";
import dayjs from "dayjs";
import { getLocalTime } from "./utils/date-utils";
import runEvery from "./utils/runEvery";
dotenv.config();

console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

const main = async () => {
  await client.login(process.env.DISCORD_BOT_TOKEN);
  console.log(client.user?.username);
  const channel = await client.channels.fetch(process.env.CHANNEL_ID!);
  if (!channel || !channel.isTextBased()) return;
  channel.send({ embeds: [exampleEmbed2] });
  channel.send("Hello world!");
  channel.send("The time is " + getLocalTime("America/Toronto"));

  runEvery(() => {
    channel.send("The time is " + getLocalTime("America/Toronto"));
  });
};
main();
