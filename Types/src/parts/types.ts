export const RegionCode = {
    US: 'us',
    DE: 'de',
    UK: 'uk',
    IT: 'it',
    FR: 'fr',
    ES: 'es',
    CA: 'ca',
} as const;

export type RegionCode = (typeof RegionCode)[keyof typeof RegionCode];

export const isValidRegionCode = (region: unknown): region is RegionCode => {
    return typeof region === 'string' && Object.values(RegionCode).includes(region as RegionCode);
};
