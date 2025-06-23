import database from '@config/prismaClient';
import { createFakeErrorLogs } from '@errorLog/faker';
import { createFakeUsers } from '@user/faker';

const main = async () => {
    const { customUsers, randomUsers } = await createFakeUsers();
    await createFakeErrorLogs(customUsers, randomUsers);
};

(async () => {
    try {
        await main();
        await database.$disconnect();
    } catch (error) {
        console.error(error);
        await database.$disconnect();
        process.exit(1);
    }
})();
