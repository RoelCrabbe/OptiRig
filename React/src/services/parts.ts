import { processEnv } from '@lib';
import { SearchOptionsType } from '@roelcrabbe/optirig-types';

export const getComponents = (searchOptions: SearchOptionsType) => {
    return fetch(processEnv.getApiUrl() + '/parts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchOptions),
    });
};
