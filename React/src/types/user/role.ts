import { UserRole, UserType, isValidUserRole } from '@roelcrabbe/optirig-types';

export const getUserRole = (user: UserType | null): UserRole | null => {
    return user?.role && isValidUserRole(user.role) ? user.role : null;
};

export const isUserRole = (user: UserType | null, role: UserRole): boolean => {
    return getUserRole(user) === role;
};

export const isAdmin = (user: UserType | null): boolean => {
    return isUserRole(user, UserRole.Admin);
};

export const isHumanResources = (user: UserType | null): boolean => {
    return isUserRole(user, UserRole.HumanResources);
};

export const isGuest = (user: UserType | null): boolean => {
    return isUserRole(user, UserRole.Guest);
};

export const getUserRoleColor = (role: UserRole) => {
    switch (role) {
        case UserRole.Admin:
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case UserRole.HumanResources:
            return 'bg-cyan-100 text-cyan-800 border-cyan-200';
        case UserRole.Guest:
            return 'bg-violet-100 text-violet-800 border-violet-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
