import schedule from "node-schedule";

export default function runEvery(fnc: () => void) {
  const job = schedule.scheduleJob("*/60 * * * *", function () {
    fnc();
  });
}
