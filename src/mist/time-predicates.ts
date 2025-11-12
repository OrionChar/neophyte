import { dayMilliseconds } from "./consts";

export function isToday(date: Date) {
    const difference = Date.now() - date.getTime();
    return difference < dayMilliseconds
}

export function isYesterday(date: Date) {
    const difference = Date.now() - date.getTime();
    return difference >= dayMilliseconds && difference < dayMilliseconds * 2
}
