import * as dotenv from 'dotenv'
import { Client } from "discord.js";
dotenv.config()

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

const main = async () => {
    await client.login(process.env.DISCORD_BOT_TOKEN);
    console.log(client.user?.username);

}
main();