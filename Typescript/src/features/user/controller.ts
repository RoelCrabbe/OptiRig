import { JwtToken, UpdatePassWordInput, UserInput } from '@types';
import { userService } from '@user';
import express, { NextFunction, Request, Response } from 'express';

const userRouter = express.Router();

userRouter.get('/current', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req as Request & { auth: JwtToken };
        const response = await userService.getCurrentUser({
            auth: header.auth,
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userService.getAllUsers();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

userRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const header = req as Request & { auth: JwtToken };
        const response = await userService.updateUser({
            userInput: user,
            auth: header.auth,
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const response = await userService.getUserById({ userId });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

userRouter.put('/change-password', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatePassWord = <UpdatePassWordInput>req.body;
        const header = req as Request & { auth: JwtToken };
        const response = await userService.changePassWord({
            updatePassWordInput: updatePassWord,
            auth: header.auth,
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
