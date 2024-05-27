import { describe, it, expect } from 'vitest';
import { isArray, isArrayLike, isDate, isFunction, isMap, isObject, isPlainObject, isPromise, isRegExp, isSet, isString, isSymbol, type } from '../src/type';

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