import { ErrorHttpMethod, ErrorSeverity, ErrorStatus, ErrorType } from '@errorLog';
import { UserRole, UserStatus } from '@user';
import { RegionCode } from 'features/parts/enums';

export type AuthenticationResponse = {
    token?: string;
};

export type JwtToken = {
    userId: number;
    role: UserRole;
};

export type UserInput = {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
    role: UserRole;
    status: UserStatus;
    phoneNumber?: string;
};

export type ErrorLogInput = {
    id?: number;
    type: ErrorType;
    severity: ErrorSeverity;
    httpMethod: ErrorHttpMethod;
    errorMessage: string;
    stackTrace: string;
    requestPath: string;
    status: ErrorStatus;
    resolvedById?: number;
    resolvedDate?: Date;
};

export type UpdatePassWordInput = {
    id?: number;
    currentPassWord: string;
    newPassWord: string;
    confirmPassWord: string;
};

export type SearchOptionsInput = {
    region?: RegionCode;
    listId: string;
};

export type PcPart = {
    category: string;
    name: string;
    imageUrl: string;
    pcpartpicker: {
        price: number;
        currency: 'USD' | 'EUR' | 'GBP' | string;
        url: string;
        buyLink: string;
    };
};
