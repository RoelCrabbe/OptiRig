import { processEnv } from '@lib';
import { UserType } from '@roelcrabbe/optirig-types';

export const loginUser = (user: UserType) => {
    return fetch(processEnv.getApiUrl() + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

export const registerUser = (user: UserType) => {
    return fetch(processEnv.getApiUrl() + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};
