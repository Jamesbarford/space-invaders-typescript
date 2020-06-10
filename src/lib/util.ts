export function isObject(arg: any): arg is object {
    return toObjectString(arg) === "[object Object]";
}

function toObjectString(arg: any): string {
    return Object.prototype.toString.call(arg);
}

export function isFunction(arg: any): arg is Function {
    return toObjectString(arg) === "[object Function]";
}

export function isArray(arg: any): arg is Array<any> {
    return toObjectString(arg) === "[object Array]";
}

export function isNil(arg: any): arg is null | undefined {
    return arg === undefined || arg === null;
}

export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}
