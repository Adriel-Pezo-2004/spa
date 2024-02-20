export declare enum FilterTypes {
    Like = "like",
    Between = "between",
    BetweenRaw = "betweenRaw",
    In = "in",
    NotIn = "notIn",
    Not = "not",
    GreaterThan = "gt",
    GreaterOrEqualThan = "gte",
    LessThan = "lt",
    LessOrEqualThan = "lte",
    Equal = "eq"
    /**
     * Not supported yet
     * TODO: Add support
    Join = 'join',
    JoinLike = 'joinLike',
    */
  }
  export declare enum Normalizers {
    ObjectId = "objectId"
  }
  export declare enum OrderVariant {
    Asc = "ASC",
    Desc = "DESC"
  }
  export interface FilterSearchParam<T> {
    searchType: string;
    value: T;
  }
  export declare const DUPLICATE_FIELD_MARKER = "$";
  export type WhereClause<T> = Array<{
    [P in keyof T]: T[P] | FilterSearchParam<P>;
  }>;
  export type ResourceFilter = {
    operationType: any;
    field: string;
    value: string;
    filterType: FilterTypes;
  };
  export interface CombinedFilter<T> {
    where?: WhereClause<T>;
    take?: number;
    page?: {
        pageIndex: number;
        size: number;
    };
    orderBy?: {
        [P in keyof T]: OrderVariant;
    };
    select?: Array<keyof T>;
    include?: string[];
    textSearch?: string;
  }
  export type FilterFn<T> = (filter: CombinedFilter<T>) => CombinedFilter<T>;
  export type OperatorFn<P> = (...args: any[]) => FilterSearchParam<P>;
  export type LikeFilterOptions = {
    flags?: 'string';
    enhanceLatinChars?: boolean;
  };
  export declare const Ops: {
    btwn: <P>(start: P, end: P) => {
        searchType: FilterTypes;
        value: {
            start: P;
            end: P;
        };
    };
    btwnDates: <P_1>(start: P_1, end: P_1) => {
        searchType: FilterTypes;
        value: {
            start: P_1;
            end: P_1;
        };
    };
    gt: (value: unknown) => {
        searchType: FilterTypes;
        value: unknown;
    };
    lt: (value: unknown) => {
        searchType: FilterTypes;
        value: unknown;
    };
    gte: (value: unknown) => {
        searchType: FilterTypes;
        value: unknown;
    };
    lte: (value: unknown) => {
        searchType: FilterTypes;
        value: unknown;
    };
    in: <P_2>(...values: (P_2 | Normalizers)[]) => {
        searchType: FilterTypes;
        value: (P_2 | Normalizers | undefined)[] | {
            normalizer: P_2 | Normalizers | undefined;
            values: (P_2 | Normalizers)[];
        };
    };
    notIn: <P_3>(...values: (Normalizers | P_3)[]) => {
        searchType: FilterTypes;
        value: (Normalizers | P_3 | undefined)[] | {
            normalizer: Normalizers | P_3 | undefined;
            values: (Normalizers | P_3)[];
        };
    };
    not: (value: unknown) => {
        searchType: FilterTypes;
        value: unknown;
    };
    like: (value: RegExp | string, flagsOrOpts?: string | LikeFilterOptions) => FilterSearchParam<string | RegExp | {
        regexp: RegExp | string;
        flags?: string | undefined;
        enhanceLatinChars?: boolean | undefined;
    }>;
    eq: <P_4>(value: P_4, normalizer?: string) => {
        searchType: FilterTypes;
        value: {
            value: P_4;
            normalizer: string | undefined;
        };
    };
  };
  export declare const addMarkersToDuplicateField: <T>(property: string, object: { [P in keyof T]: T[P] | FilterSearchParam<P>; }) => string;
  export declare const removeMarkersFromDuplicateField: (property: string) => string;
  export declare const where: <T>(field: keyof T, value: any, method?: FilterTypes) => FilterFn<T>;
  export declare const orWhere: <T>(whereParams_0: keyof T, whereParams_1: any, whereParams_2?: FilterTypes | undefined) => FilterFn<T>;
  export declare const andWhere: <T>(field: keyof T, value: any, method?: FilterTypes) => FilterFn<T>;
  export declare const andAllWhere: <T>(field: keyof T, value: any, method?: FilterTypes) => FilterFn<T>;
  export declare const andAtLeastOneWhere: <T>(params_0: keyof T, params_1: any, params_2?: FilterTypes | undefined) => FilterFn<T>;
  export declare const andOnlyWhere: <T>(params_0: keyof T, params_1: any, params_2?: FilterTypes | undefined) => FilterFn<T>;
  export declare const seed: <T>(initialFilter: CombinedFilter<T>) => () => CombinedFilter<T>;
  export declare const take: <T>(takeAmount: number) => FilterFn<T>;
  export declare const include: <T>(assocNames: string[]) => FilterFn<T>;
  export declare const withOption: <T>(optionName: string, optionValue: any) => FilterFn<T>;
  export declare const page: <T>(pageIndex: number, size?: number) => FilterFn<T>;
  export declare const orderBy: <T>(field: keyof T, direction: OrderVariant) => FilterFn<T>;
  export declare const andThenBy: <T>(field: keyof T, direction: OrderVariant) => FilterFn<T>;
  export declare const select: <T>(fields: (keyof T)[]) => FilterFn<T>;
  export declare const buildQuery: <T>(...filters: FilterFn<T>[]) => CombinedFilter<T>;
  export declare const noop: <T>() => FilterFn<T>;
  export declare const getFilterValueFactory: <T>(path: string) => any;
  export declare const textSearch: <T>(value: string) => FilterFn<T>;