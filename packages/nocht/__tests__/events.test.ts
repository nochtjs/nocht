// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { nocht } from '../src';

describe('@nocht/core/events', () => {
    const n = nocht(document);
    it('should add event listeners', () => {
        const fn = vi.fn();
        n.on('click', fn);
        document.body.click();
        expect(fn).toHaveBeenCalledOnce();
    });

    it('should remove event listeners', () => {
        const fn = vi.fn();
        n.on('click', fn);
        document.body.click();
        expect(fn).toHaveBeenCalledOnce();
        n.off('click', fn);
        document.body.click();
        expect(fn).toHaveBeenCalledOnce();
    });

    it('should run handlers once', () => {
        const fn = vi.fn();
        n.one('click', fn);
        document.body.click()
        document.body.click()
        document.body.click()
        document.body.click()
        document.body.click()
        expect(fn).toHaveBeenCalledOnce();
    });

    it('should handle multiple events', () => {
        const clickFn = vi.fn();
        const customFn = vi.fn();
        n.on('click custom:event', (e) => {
            console.log(e.type);
            if (e.type === 'click') {
                clickFn();
            } else {
                customFn();
            }
        });

        document.body.click();
        expect(clickFn).toHaveBeenCalledOnce();
        expect(customFn).not.toHaveBeenCalledOnce()
        document.body.dispatchEvent(new CustomEvent('custom:event'));
        expect(customFn).toHaveBeenCalledOnce();
    })
})