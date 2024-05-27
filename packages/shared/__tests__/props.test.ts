import { describe, expect, it } from "vitest";
import { hasOwn } from "../src/props";

describe('@nocht/shared/props', () => {
    it('should check for numeric keys', () => {
        expect(hasOwn([0,1,2], 1)).toBe(true);
        expect(hasOwn([0], 3)).toBe(false);
    });

    it('should check for direct properties', () => {
        expect(hasOwn({}, 'hasOwnProperty')).not.toBe('hasOwnProperty' in ({}))
    })
})