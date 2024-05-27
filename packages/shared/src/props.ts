import { describe, it, expect } from 'vitest';

/**
 * Look to replace this with simply Object.hasOwn when adoption is wider
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: number | string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key);

if (import.meta.vitest) {
    describe('@nocht/shared/props', () => {
        it('should check for numeric keys', () => {
            expect(hasOwn([0,1,2], 1)).toBe(true);
            expect(hasOwn([0], 3)).toBe(false);
        });

        it('should check for direct properties', () => {
            expect(hasOwn({}, 'hasOwnProperty')).not.toBe('hasOwnProperty' in ({}))
        })
    })
}