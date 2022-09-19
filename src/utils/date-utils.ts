import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc)
dayjs.extend(timezone)

export const getLocalTime = (timezone: string): string => {
    return dayjs().tz(timezone).format("hh:mm:ss");
}

export const getToday = (): Date => {
    return dayjs().tz("America/Toronto").toDate();
}
