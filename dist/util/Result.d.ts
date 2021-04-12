export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: T | Error | string;
    private _value;
    constructor(isSuccess: boolean, error?: T | Error | string, value?: T);
    getValue(): T;
    errorValue(): T;
    static ok<U>(value?: U): Result<U>;
    static fail<U>(error: string): Result<U>;
}
