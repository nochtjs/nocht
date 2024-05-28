// @vitest-environment jsdom
import { expect, it, describe, vi } from 'vitest';
import { nocht, Nocht } from '../src';

describe('@nocht/core', () => {
    it('should return an instance of Nocht', () => {
        expect(nocht([])).toBeInstanceOf(Nocht);
    });

    it('should accept a function as a initializer', () => {
        const fn = vi.fn(() => {
            console.log('ran');
        });

        nocht(fn);
        // since ready runs on the scheduler, we gotta pause the check by just a smidge
        setTimeout(() => {
            expect(fn).toHaveBeenCalledOnce();
        }, 100)
    });

    it('should accept a dom element', () => {
        const $ = nocht(document.body);

        expect($).toBeInstanceOf(Nocht);
        expect($[0]).toBe(document.body);
    });

    it('should accept an array of dom elements', () => {
        document.body.insertAdjacentHTML('beforeend', `<div id="test"><ul><li></li></ul></div>`);

        const els = Array.from(document.querySelectorAll('div, ul, li'));
        const $ = nocht(els);

        expect($).toBeInstanceOf(Nocht);
        expect($[0].localName).toBe('div');
        expect($[1].localName).toBe('ul');
        expect($[2].localName).toBe('li');
        expect($.length).toBe(3);
    });

    it('should accept a selector string', () => {
        const $ = nocht('div');
        const $has = nocht('div:has(ul)');
        const div = document.body.children[0];
        
        expect($[0]).toBe(div);
        expect($has[0]).toBe(div);
        expect($).toBeInstanceOf(Nocht);
        expect($has).toBeInstanceOf(Nocht);
    });
});