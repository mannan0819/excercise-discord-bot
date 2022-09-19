import { Client } from "discord.js";
import { buildEmbed } from "../components/embedForm";

export const newBoard = async (client: Client) => {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID!);
    if (!channel || !channel.isTextBased()) return;
    channel.send({ embeds: [await buildEmbed()] });
}
