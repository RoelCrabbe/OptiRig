export const getApiPort = (): number => {
    const value = process.env.NEXT_PUBLIC_API_PORT;
    const port = value ? parseInt(value, 10) : 3000;
    return isNaN(port) ? 3000 : port;
};

export const getBaseUrl = (): string => {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    return url?.trim() || 'http://localhost:8080';
};

export const getDatabaseUrl = (): string => {
    const value = process.env.DATABASE_URL || 'default_url';
    return value;
};

export const getJwtSecret = (): string => {
    const value = process.env.JWT_SECRET || 'default_secret';
    return value;
};

export const getJwtExpiresHours = (): number => {
    const value = process.env.JWT_EXPIRES_HOURS;
    const hours = value ? parseInt(value, 10) : 1;
    return isNaN(hours) ? 1 : hours;
};
