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

export function forEach<T>(arg: Array<T>, cb: (val: T, index: number) => void): void;
export function forEach<T>(
    arg: Dictionary<T>,
    cb: (val: T, key: keyof Dictionary<T>, index: number) => void
): void;

export function forEach(arg: any, cb: any): void {
    if (isArray(arg)) forEachArray(arg, cb);
    else if (isObject(arg)) forEachObj(<any>arg, cb);
}

function forEachObj<T>(arg: Dictionary<T>, cb: (val: T, key: string, index: number) => void): void {
    let i = -1;
    for (const key in arg) cb(arg[key], key, ++i);
}

function forEachArray<T>(arg: Array<T>, cb: (val: T, index: number) => void): void {
    let i = -1;
    for (const iterator of arg) cb(iterator, ++i);
}

export function deleteInDict<T>(dictionary: Dictionary<T>, key: string): Dictionary<T> {
    const { [key]: value, ...withoutKey } = dictionary;
    return withoutKey;
}

export function get<T, K, V>(arg: T, path: K | Array<K>, fallback?: V): V | undefined {
    const searchPath = isArray(path) ? path : [path];

    let i = 0;
    const length = searchPath.length;

    while (arg != null && i < length) {
        (<any>arg) = (<any>arg)[searchPath[i++]];
    }

    return i && i === length ? <any>arg : fallback;
}
