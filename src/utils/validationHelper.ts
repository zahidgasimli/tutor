export const isEmpty = (value: string | null | undefined): boolean => {
    return value === null || value === 'null' || value === undefined || value === '' || value === 'undefined';
};

export const isEmptyObject = (object: Record<string, unknown>): boolean =>
    object && Object.values(object).every((x) => x === null || x === '');
