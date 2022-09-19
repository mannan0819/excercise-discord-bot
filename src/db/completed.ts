import { getToday } from "../utils/date-utils";
import { myPrisma } from "./client";

export const isCompleted = async (discordUserId: string): Promise<boolean> => {
    const completed = await myPrisma.completed.findFirst({
        where: {
            discordUserId,
            date: getToday(),
        }
    });
    // console.log(completed)
    return !!completed;
}

export const isCompletedDay = async () =>
    await myPrisma.completed.findMany({
        where: {
            date: getToday(),
        }
    });

export const complete = async (discordUserId: string) => {
    if (await isCompleted(discordUserId)) return undefined;
    try {
        const completed = await myPrisma.completed.create({
            data: {
                discordUserId,
                date: getToday(),
            }
        });
        return completed;
    }
    catch (e) {
        return undefined;
    }
}