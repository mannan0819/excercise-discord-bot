import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { buildEmbed, exampleEmbed, exampleEmbed2 } from "./components/embedForm";
import dayjs from "dayjs";
import { getLocalTime } from "./utils/date-utils";
import runEvery from "./utils/runEvery";
import { commands } from "./commands";
import { registerCommands } from "./commands/commandBuilder";
import { newBoard } from "./utils/progressBoard";
dotenv.config();

console.log("Bot is starting...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const main = async () => {
  await client.login(process.env.DISCORD_BOT_TOKEN);
  await registerCommands();
  commands(client);

  // console.log(client.user?.username);

  const channel = await client.channels.fetch(process.env.CHANNEL_ID!);
  if (!channel || !channel.isTextBased()) return;


  newBoard(client);

  // channel.send("Bot Has started!!");
  // client.on("messageCreate", async (message) => {
  //   // console.log(message.author);
  //   if (message.author.id === process.env.CLIENT_ID) {
  //     await message.react("👍");
  //     // await message.delete();
  //   }
  // });
  // const message = channel.send(
  //   "The time is " + getLocalTime("America/Toronto")
  // );
  // setTimeout(async () => {
  //   (await message).edit(
  //     "The new time is  is " + getLocalTime("America/Toronto")
  //   );
  // }, 10000);

  runEvery(() => {
    channel.send("The time is " + getLocalTime("America/Toronto"));
  });
};

main();
