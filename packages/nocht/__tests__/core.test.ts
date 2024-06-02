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
        document.body.insertAdjacentHTML('beforeend', `<div id="test"><ul><li><span></span></li></ul><ul></ul><ul></ul><span><ul></ul></span></div>`);

        const els = Array.from(document.querySelectorAll('div, ul, li'));
        const $ = nocht(els);

        expect($).toBeInstanceOf(Nocht);
        // @ts-ignore
        expect($[0].localName).toBe('div');
        // @ts-ignore
        expect($[1].localName).toBe('ul');
        // @ts-ignore
        expect($[2].localName).toBe('li');
        expect($.length).toBe(6);
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

    it('should filter for elements that match a selector', () => {
        const $ = nocht('div');

        const ul = document.querySelectorAll('div:has(ul)');

        expect($.has('ul').length).toBe(ul.length);
    });

    it('should find children of items', () => {
        const $ = nocht('div, ul, li');
        const output = $.find('span');
        
        expect($.find('span').length).toBe(2);
    });

    it('should add elements to instance', () => {
        const $ = nocht('div');
        const added = $.add('li');
        expect(added.length).toBe(2);
        const el = document.querySelector('ul') as Element;
        const added2 = added.add(el);
        expect(added.length).toBe(2);
        expect(added2.length).toBe(3);
        const added3 = added2.add('li');
        expect(added3.length).toBe(3);
    });

    it('should get the children of elements', () => {
        const $ = nocht('div');
        
        expect($.children().length).toBe(4);
        expect($.children('span').length).toBe(1);
    });

    it('should get closest of each element in instance', () => {
        const $ = nocht('span');
        expect($.closest('ul').length).toBe(1);

        const _ = nocht('span, li');

        expect($.closest('ul').length).toBe(1);
    })
});