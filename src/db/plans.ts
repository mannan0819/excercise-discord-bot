import { prisma } from "./client"

export const updateDefaultPlan = async (toChangePlan: string) => {
    const defaultPlan = await prisma.plans.findFirst({ where: { isDefault: true } });
    if (!defaultPlan) return undefined;
    defaultPlan.plan = toChangePlan;
    return prisma.plans.update({ where: { id: defaultPlan.id }, data: defaultPlan });
}

export const addPlan = async (plan: string, ping: false, frequency: string) => {
    return prisma.plans.create({ data: { plan, ping, frequency } });
}
