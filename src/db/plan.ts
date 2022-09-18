import { myPrisma } from "../db/client";

export const getDefaultPlan = () =>
  myPrisma.plans.findFirst({ where: { isDefault: true } });

export const changeDefaultPlan = async (updatedPlan: string) => {
  const plan = await getDefaultPlan();
  if (!plan) return;
  plan.plan = updatedPlan;
  await myPrisma.plans.update({
    where: { id: plan.id },
    data: plan,
  });
};

export const addPlan = async (
  plan: string,
  ping: false,
  frequency: string,
  discordUesrId: string
) => {
  return myPrisma.plans.create({
    data: { plan, ping, frequency, discordUesrId },
  });
};
