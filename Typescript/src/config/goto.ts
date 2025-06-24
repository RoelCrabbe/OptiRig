import { partsService } from '@parts/index';
import { SearchOptionsType } from '@roelcrabbe/optirig-types';

(async () => {
    const listId = 'MjtbzP';
    const input: SearchOptionsType = { listId };
    partsService.getComponentList({ searchOptionsInput: input });
})();
