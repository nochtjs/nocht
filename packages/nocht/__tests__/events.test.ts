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
        n.on('custom:event click', (e) => {
            if (e.type === 'click') {
                clickFn();
            } else {
                customFn();
            }
        });

        document.body.click();
        expect(clickFn).toHaveBeenCalledOnce();
        expect(customFn).not.toHaveBeenCalled()
        document.dispatchEvent(new CustomEvent('custom:event'));
        expect(customFn).toHaveBeenCalledOnce();
    });

    it('should accept an object of events', () => {
        const click = vi.fn();
        const keydown = vi.fn();
        const custom = vi.fn();

        const events = {
            click,
            keydown,
            custom
        };

        n.on(events);

        document.body.click();
        document.dispatchEvent(new Event('keydown'));
        document.dispatchEvent(new CustomEvent('custom'));

        expect(click).toHaveBeenCalledOnce();
        expect(keydown).toHaveBeenCalledOnce();
        expect(custom).toHaveBeenCalledOnce();
    });

    it('should trigger events', () => {
        const fn = vi.fn();
        n.on('click', fn);

        n.trigger('click');
        expect(fn).toHaveBeenCalledOnce();
    })

    it('should make this inside of the handler equal to the event target', () => {
        document.body.innerHTML += '<div></div><div></div><div></div>';
        const $ = nocht('div');

        const targetedDiv = document.body.children[1];
        $.on('click', function() {
            expect(this).toStrictEqual(targetedDiv);
        });

        // @ts-ignore
        targetedDiv.click();
    })
})