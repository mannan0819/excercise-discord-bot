import { Client, Interaction, SlashCommandBuilder } from "discord.js";
import { buildEmbed } from "../components/embedForm";
import { complete } from "../db/completed";
import { addPlan, getDefaultPlan } from "../db/plan";

export const commands = (client: Client) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply({ content: "Pong!", ephemeral: true });
      // setTimeout(async () => {
      //   await interaction.deleteReply();
      // }, 3000);
    } else if (commandName === "server") {
      await interaction.reply("Server info.");
    } else if (commandName === "user") {
      await interaction.reply("User info.");
    } else if (commandName === "default") {
      let reply = "Plan: ";
      const plan = await getDefaultPlan();
      if (!plan) reply = "No default plan found";
      else reply += plan.plan;
      console.log(interaction.user)
      await interaction.reply({ content: reply, ephemeral: true });
    } else if (commandName === "signup") {
      let userplan = interaction.options.getString("plan");
      if (!userplan) userplan = (await getDefaultPlan())?.plan ?? "";
      const plan = await addPlan(userplan, false, "daily", interaction.user.id, interaction.user.username);

      let reply = "";
      if (!plan) reply = "Something went wrong. Your plan was not saved.";
      else reply = "Your plan has been set. \n" + plan.plan;
      await interaction.reply({ content: reply, ephemeral: true });
    }
    else if (commandName === "done") {
      const completed = await complete(interaction.user.id);
      const reply =
        completed ?
          "Congradualtions on completing your workout!" :
          "You have already completed your workout for today!";
      await interaction.reply({ content: reply, ephemeral: true });
      const channel = await client.channels.fetch(process.env.CHANNEL_ID!);
      if (!channel || !channel.isTextBased()) return;
      channel.send({ embeds: [await buildEmbed()] });
    }
  });
};
