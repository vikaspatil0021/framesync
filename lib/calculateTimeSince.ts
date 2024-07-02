export function calculateTimeSince(dateString: string) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const elapsedMilliseconds = now.getTime() - inputDate.getTime();

    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return "Just now";
    } else if (minutes < 60) {
        return `${minutes}m`;
    } else if (hours < 24) {
        return `${hours}h`;
    } else if (days < 365) {
        return `${days}d`;
    } else {
        return `${years}y`;
    }
}
