import {
    faArrowDown,
    faArrowUpRightFromSquare,
    faCode,
    faPen,
    faPlusCircle,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ErrorHttpMethod } from '@roelcrabbe/optirig-types';

export const getErrorHttpMethodColor = (type: ErrorHttpMethod): string => {
    switch (type) {
        case ErrorHttpMethod.Get:
            return 'bg-cyan-100 text-cyan-800';
        case ErrorHttpMethod.Post:
            return 'bg-lime-100 text-lime-800';
        case ErrorHttpMethod.Put:
            return 'bg-amber-100 text-amber-800';
        case ErrorHttpMethod.Patch:
            return 'bg-orange-200 text-orange-900';
        case ErrorHttpMethod.Delete:
            return 'bg-rose-200 text-rose-900';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getErrorHttpMethodIcon = (type: ErrorHttpMethod) => {
    switch (type) {
        case ErrorHttpMethod.Get:
            return faArrowDown;
        case ErrorHttpMethod.Post:
            return faPlusCircle;
        case ErrorHttpMethod.Put:
            return faArrowUpRightFromSquare;
        case ErrorHttpMethod.Patch:
            return faPen;
        case ErrorHttpMethod.Delete:
            return faTrashAlt;
        default:
            return faCode;
    }
};
