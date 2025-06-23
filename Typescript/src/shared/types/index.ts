import { ErrorHttpMethod, ErrorSeverity, ErrorStatus, ErrorType } from '@errorLog';
import { UserRole, UserStatus } from '@user';

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
