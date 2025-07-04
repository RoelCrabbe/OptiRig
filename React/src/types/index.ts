export * from './user/role';
export * from './user/status';

export * from './errorLog/method';
export * from './errorLog/severity';
export * from './errorLog/status';
export * from './errorLog/type';

export * from './parts/category';

export type LabelMessage = {
    label: string;
    message: string;
    type: 'error' | 'success' | 'info';
};

export type IdName = {
    id?: number;
    name: string;
};

export type CssOptionType = {
    value: number;
    label: string;
};
