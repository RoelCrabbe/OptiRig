import { faCheckCircle, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { UserStatus } from '@roelcrabbe/optirig-types';

export const getUserStatusColor = (status: UserStatus) => {
    switch (status) {
        case UserStatus.Active:
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case UserStatus.InActive:
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case UserStatus.Deleted:
            return 'bg-pink-100 text-pink-800 border-pink-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getUserStatusIcon = (status: UserStatus) => {
    switch (status) {
        case UserStatus.Active:
            return faCheckCircle;
        case UserStatus.InActive:
            return faXmarkCircle;
        case UserStatus.Deleted:
            return faTrash;
        default:
            return faXmarkCircle;
    }
};
