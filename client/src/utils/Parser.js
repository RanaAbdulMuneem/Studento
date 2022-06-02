export const timeAgo = (date) => {
    let diff = Date.now() - Date.parse(date); //time in milliseconds
    diff = Math.floor(diff/1000); //time in seconds
    diff = Math.floor(diff/60); //time in minutes
    if (diff < 60)
        return `${diff} minutes`;
    diff = Math.floor(diff/60); //time in hours
    if (diff < 24)
        return `${diff} hours`;
    diff = Math.floor(diff/24); //time in days
    return `${diff} days`;
}