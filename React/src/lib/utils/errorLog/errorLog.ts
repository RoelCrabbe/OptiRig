import { ErrorLogType } from '@roelcrabbe/optirig-types';

export const updateErrorLogs = (
    prev: ErrorLogType[],
    updated: ErrorLogType,
    selectedStatus: string,
): ErrorLogType[] => {
    const { id, status } = updated;
    const statusChanged = status !== selectedStatus;

    const existing = prev.find((log) => log.id === id);
    if (!existing) return prev;

    return statusChanged
        ? prev.filter((log) => log.id !== id)
        : prev.map((log) => (log.id === id ? updated : log));
};
