const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

export default function convertBytes(x: number) {

    let l = 0, n = x || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}