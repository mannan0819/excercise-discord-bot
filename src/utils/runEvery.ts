import schedule from "node-schedule";

export default function runEvery(fnc: () => void) {
  const job = schedule.scheduleJob("*/2 * * * *", function () {
    fnc();
  });
}
