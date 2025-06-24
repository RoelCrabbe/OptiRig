import { ErrorHttpMethod, ErrorSeverity, ErrorStatus, ErrorType } from './errorLog/types';
import { RegionCode } from './parts/types';
import { UserRole, UserStatus } from './user/types';

export * from './errorLog/types';
export * from './parts/types';
export * from './user/types';

export type AuthenticationResponse = {
    token?: string;
};

export type JwtToken = {
    userId: number;
    role: UserRole;
};

export type UserType = {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
    role: UserRole;
    status: UserStatus;
    phoneNumber?: string;
    profileImage?: ProfileImageType;
};

export type ProfileImageType = {
    id?: number;
    url: string;
    altText: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
};

export type ErrorLogType = {
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

export type UpdatePassWordType = {
    id?: number;
    currentPassWord: string;
    newPassWord: string;
    confirmPassWord: string;
};

export type SearchOptionsType = {
    region?: RegionCode;
    listId: string;
};

export type PcPartType = {
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
