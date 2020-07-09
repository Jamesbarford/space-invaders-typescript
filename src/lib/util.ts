export function isObject(arg: unknown): arg is object {
    return toObjectString(arg) === "[object Object]";
}

function toObjectString(arg: unknown): string {
    return Object.prototype.toString.call(arg);
}

export function isFunction(arg: unknown): arg is Function {
    return toObjectString(arg) === "[object Function]";
}

export function isArray<T>(arg: unknown): arg is Array<T> {
    return toObjectString(arg) === "[object Array]";
}

export function isNil(arg: unknown): arg is null | undefined {
    return arg === undefined || arg === null;
}

export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export function forEach<T>(arg: Array<T>, cb: (val: T, index: number) => boolean | void): boolean | void;
export function forEach<T>(
    arg: Dictionary<T>,
    cb: (val: T, key: keyof Dictionary<T>, index: number) =>  boolean | void
): boolean | void;

export function forEach(arg: any, cb: any): boolean | void {
    if (isArray(arg)) return forEachArray(arg, cb);
    else if (isObject(arg)) return forEachObj(<any>arg, cb);
}

export function forEachObj<T>(
    arg: Dictionary<T>,
    cb: (val: T, key: string, index: number) => boolean | void
): true | void {
    let i = -1;
    for (const key in arg) if (cb(arg[key], key, ++i)) return true;
}

function forEachArray<T>(arg: Array<T>, cb: (val: T, index: number) => void | true): boolean | void {
    for (let i = 0; i < arg.length; ++i) if (cb(arg[i], i)) return true;
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


export function fromEvent(domElement: Node, eventName: string) {
    return {
        subscribe: (eventHandler: (e: Event) => void) => {
            domElement.addEventListener(eventName, eventHandler);
        },
        unsubscribe: (eventHandler: (e: Event) => void) => {
            domElement.removeEventListener(eventName, eventHandler);
        }
    }
}
