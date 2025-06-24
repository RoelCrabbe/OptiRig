import { faBug, faExclamationTriangle, faKey, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ErrorType } from '@roelcrabbe/optirig-types';

export const getErrorTypeColor = (type: ErrorType): string => {
    switch (type) {
        case ErrorType.NotFoundError:
            return 'bg-orange-300 text-orange-900';
        case ErrorType.ValidationError:
            return 'bg-pink-200 text-pink-900';
        case ErrorType.AuthenticationError:
            return 'bg-indigo-200 text-indigo-900';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getErrorTypeIcon = (type: ErrorType) => {
    switch (type) {
        case ErrorType.NotFoundError:
            return faSearch;
        case ErrorType.ValidationError:
            return faExclamationTriangle;
        case ErrorType.AuthenticationError:
            return faKey;
        default:
            return faBug;
    }
};
