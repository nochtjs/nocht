// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { Nocht, nocht } from '../src';


describe('@nocht/core/ready', () => {
    it('should return a nocht instance', () => {
        const $ = nocht();
        const fn = vi.fn();

        const returnedResult = $.ready(fn)
        expect(returnedResult).toBeInstanceOf(Nocht);
        setTimeout(() => expect(fn).toHaveBeenCalledOnce(), 100);
    });
})

describe('@nocht/core/then', () => {
    it('should return a nocht instance', () => {
        const $ = nocht();
        const fn = vi.fn();

        const returnedResult = $.tick(fn);
        expect(returnedResult).toBeInstanceOf(Nocht);
        setTimeout(() => expect(fn).toHaveBeenCalledOnce(), 100);
    })
})