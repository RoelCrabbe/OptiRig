import { SearchOptionsType } from '@roelcrabbe/optirig-types';
import express, { NextFunction, Request, Response } from 'express';
import { partsService } from '.';

const partsRouter = express.Router();

partsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchOptions = <SearchOptionsType>req.body;
        const response = await partsService.getComponentList({
            searchOptionsInput: searchOptions,
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default partsRouter;
