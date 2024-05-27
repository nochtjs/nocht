// @vitest-environment jsdom
import { nocht } from '../src'
import { describe, it, expect } from 'vitest';

describe('@nocht/core/scheduler', () => {
    console.log(document);
    it('should run functions when document was already initialized', () => {
        let i = 0;
        nocht(() => i += 1);
        expect(i).toBe(1);
    })
})

