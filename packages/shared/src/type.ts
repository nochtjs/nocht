import { describe, it, expect } from 'vitest';
import { hasOwn } from './props';

const $t = (obj: unknown) => globalThis?.toString.call(obj);

export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> => $t(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> => $t(val) === '[object Set]';
export const isDate = (val: unknown): val is Date => $t(val) === '[object Date]';
export const isRegExp = (val: unknown): val is RegExp => $t(val) === '[object RegExp]';
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
)

const hasValidLength = (val: Record<any, any>):boolean => hasOwn(val, 'length') && typeof val.length === 'number' && val.length >= 0;
export const isArrayLike = (val: unknown): val is ArrayLike<unknown> => {
    let _isObj = isObject(val);
    if (_isObj) {
        const v = val as Record<any, any>
        if (typeof v[Symbol.iterator as unknown as string] === 'function') return true;
    }
    if (hasValidLength(val as Record<any, any>)) return true;
    return false;
}

export const isPlainObject = (val: unknown): val is object => $t(val) === '[object Object]';
export const type = (obj: unknown) => $t(obj).slice(8, -1);

if (import.meta.vitest) {
    describe('@nocht/shared/type', () => {
        it('should recognize types', () => {
            expect(isArray([])).toBe(true);
            expect(isDate(new Date)).toBe(true);
            expect(isFunction(function() {})).toBe(true);
            expect(isFunction(async function() {})).toBe(true);
            expect(isMap(new Map)).toBe(true);
            expect(isObject({})).toBe(true);
            expect(isPromise(new Promise<void>(res => res()))).toBe(true);
            expect(isRegExp(new RegExp('\d'))).toBe(true);
            expect(isRegExp(/\d/)).toBe(true);
            expect(isSet(new Set)).toBe(true);
            expect(isString('')).toBe(true);
            expect(isSymbol(Symbol())).toBe(true);
            expect(isSymbol(Symbol.for(''))).toBe(true);
            expect(isPlainObject({})).toBe(true);
            expect(isPlainObject([])).toBe(false);
            expect(isArrayLike(123)).toBe(false);
            expect(isArrayLike([])).toBe(true);
            // expect(isArrayLike({ length: 10 })).toBe(true);
            expect(isArrayLike({ length: 10 })).toBe(true);
            expect(isArrayLike('123')).toBe(true);
        });

        it('should return the type in a single capitalized word', () => {
            const objs = ['', 2, [], {}, new Map, new Set, new WeakMap, new WeakSet, function(){}, undefined, null, true];

            expect(objs.map(type)).toStrictEqual([
                'String',
                'Number',
                'Array',
                'Object',
                'Map',
                'Set',
                'WeakMap',
                'WeakSet',
                'Function',
                'Undefined',
                'Null',
                'Boolean'
            ])
        })
    })
}