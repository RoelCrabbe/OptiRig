import { partsService } from '@parts/index';
import { SearchOptionsInput } from '@types';

(async () => {
    const listId = 'MjtbzP';
    const input: SearchOptionsInput = { listId };
    partsService.getComponentList({ searchOptionsInput: input });
})();
