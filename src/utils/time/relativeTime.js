export function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diff = (date.getTime() - now.getTime()) / 1000;

    const units = [
        { unit: "year", seconds: 31536000 },
        { unit: "month", seconds: 2592000 },
        { unit: "week", seconds: 604800 },
        { unit: "day", seconds: 86400 },
        { unit: "hour", seconds: 3600 },
        { unit: "minute", seconds: 60 },
        { unit: "second", seconds: 1 }
    ];

    const rtf = new Intl.RelativeTimeFormat("en", {
        numeric: "auto"
    });

    for (const { unit, seconds } of units) {
        const value = Math.trunc(diff / seconds);

        if (Math.abs(value) >= 1) {
            return rtf.format(value, unit);
        }
    }

    return "now";
}