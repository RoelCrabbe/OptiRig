export const validatePartPickerUrl = (url: string | null): string | null => {
    if (!url?.trim()) return 'PartPicker URL is required.';
    const trimmed = url.trim();
    const pcPartPickerRegex =
        /^https?:\/\/(www\.)?(pcpartpicker|[a-z]{2}\.pcpartpicker)\.com\/list\/[a-zA-Z0-9]+\/?$/;
    if (!pcPartPickerRegex.test(trimmed)) return 'Invalid PartPicker list URL.';
    return null;
};

export const extractListId = (url: string): string | null => {
    try {
        const path = new URL(url).pathname;
        const segments = path.split('/').filter(Boolean);
        return segments[segments.length - 1] || null;
    } catch {
        return null;
    }
};

export const validateRegionCode = (region: string | null) => {
    if (!region?.trim()) return 'Region is required.';
    return null;
};
