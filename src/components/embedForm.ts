import { Completed } from "@prisma/client";
import { EmbedBuilder } from "discord.js";
import { isCompleted, isCompletedDay } from "../db/completed";
import { getPlans } from "../db/plan";


const checkIfCompleted = (discordUserId: string, completedList: Completed[]) =>
    completedList.find((completed: Completed) => completed.discordUserId === discordUserId);


const getDesciption = async () => {
    const plans = await getPlans();
    const completedforDay = await isCompletedDay();
    let description = '';
    if (plans.length === 0) description = 'No plans found';
    plans.forEach((plan) => {
        const completed = checkIfCompleted(plan.discordUserId, completedforDay);
        const completedText = completed ? ' x ' : '  ';
        description += `[ ${completedText} ]  ${plan.username}: ${plan.plan}\n`
    })
    return description;
}

export const buildEmbed = async () => {
    const description = await getDesciption();
    return new EmbedBuilder()
        .setColor(0x601721)
        .setTitle('EXERCISE PLAN ')
        .setDescription(description)
}

export const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

export const exampleEmbed2 = {
    color: 0x0099ff,
    title: 'Some title',
    url: 'https://discord.js.org',
    author: {
        name: 'Some name',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://discord.js.org',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
    },
    fields: [
        {
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/AfFp7pu.png',
    },
    timestamp: new Date().toISOString(),
    footer: {
        text: 'Some footer text here',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
    },
};

