import { hourMilliseconds, minuteMilliseconds } from "../mist/consts";
import { isToday, isYesterday } from "./time-predicates";

export function formatTitleDate(date: Date): string {
    if (isToday(date)) {
        return 'Today'
    } else if (isYesterday(date)) {
        return 'Yesterday'
    } else {
        return new Intl.DateTimeFormat(navigator.languages[0], {
            day: 'numeric',
            month: 'short',
        }).format(date)
    }
}

export function formatTime(date: Date): string {
    const deference = Date.now() - date.getTime();
    const hours = Math.floor(deference / hourMilliseconds)
    const minutes = Math.floor((deference - hourMilliseconds * hours) / minuteMilliseconds)

    if (hours > 0) {
        return `${hours}h. ago`
    } else if (minutes > 0) {
        return `${minutes}m. ago`
    } else {
        return 'a few seconds ago'
    }
}