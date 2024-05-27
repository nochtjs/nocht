// @vitest-environment jsdom
import { Nocht, nocht } from '../src/core';
import { describe, it, expect } from 'vitest';

describe('@nocht/core', () => {
    it('should return an instance of Nocht', () => {
        expect(nocht([])).toBeInstanceOf(Nocht)
    })
})