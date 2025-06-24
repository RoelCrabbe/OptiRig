import { getToken, processEnv } from '@lib';
import { ErrorLogType } from '@roelcrabbe/optirig-types';

export const getAllNewErrorLogs = () => {
    return fetch(processEnv.getApiUrl() + `/error-logs/new`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const getAllReviewedErrorLogs = () => {
    return fetch(processEnv.getApiUrl() + `/error-logs/reviewed`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const getAllResolvedErrorLogs = () => {
    return fetch(processEnv.getApiUrl() + `/error-logs/resolved`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const updateErrorLog = (errorLog: ErrorLogType) => {
    return fetch(processEnv.getApiUrl() + `/error-logs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(errorLog),
    });
};
