export const parseCookie = (cookie: string): string => {
    const parsed = cookie.split('=');
    if (parsed.length !== 2) {
        return '';
    }
    return parsed[1];
};
