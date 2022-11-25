export function cropAddress(string?: string, reduceValue = 16): string {
    if (!string) {
        return '';
    }

    if (string.length > 2 * reduceValue) {
        return `${string.slice(0, reduceValue)}…${string.slice(-reduceValue)}`;
    }
    return string;
}
