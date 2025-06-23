import { UserRole, UserStatus } from '@types';

export type User = {
    id?: number;
    role: UserRole;
    status: UserStatus;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
    phoneNumber?: string;
};

export type UpdatePassWord = {
    id?: number;
    currentPassWord: string;
    newPassWord: string;
    confirmPassWord: string;
};
