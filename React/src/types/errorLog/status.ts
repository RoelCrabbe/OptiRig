import { faBell, faCheckCircle, faCode, faEye } from '@fortawesome/free-solid-svg-icons';
import { ErrorStatus } from '@roelcrabbe/optirig-types';

export const getErrorStatusColor = (status: ErrorStatus): string => {
    switch (status) {
        case ErrorStatus.New:
            return 'bg-teal-100 text-teal-800';
        case ErrorStatus.Reviewed:
            return 'bg-green-200 text-green-900';
        case ErrorStatus.Resolved:
            return 'bg-zinc-100 text-zinc-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getErrorStatusIcon = (status: ErrorStatus) => {
    switch (status) {
        case ErrorStatus.New:
            return faBell;
        case ErrorStatus.Reviewed:
            return faEye;
        case ErrorStatus.Resolved:
            return faCheckCircle;
        default:
            return faCode;
    }
};
