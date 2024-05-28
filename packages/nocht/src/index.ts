import { ready, tick } from './scheduler';
import type { N } from './types';
import { isArray, isFunction, isString } from '@nocht/shared';
import { on, off, trigger } from './events';


export class Nocht<T extends Document|Element> extends Array<T> implements N.Nocht {
    /**
     * Say you have a page with 4 div elements:
     * 
     * ```ts
     * nocht('div')[2] // same as document.querySelectorAll('div')[2];
     * ```
     * 
     * ```ts
     * const $ = nocht({
     *  name: 'Jill',
     *  test() { return true }
     * });
     * 
     * $.name // 'Jill'
     * $.test() // should return true as the test function passed in was add to this nocht instance
     * ```
     */
    [index: string|symbol]: any;
    __nocht__:true = true;
    ctx: N.Context;
    ready(fn: () => void) {
        ready.call(this, fn);
        return this;
    }

    getCtx() {
        return (this.ctx as N.Nocht).__nocht__ === true ? (this.ctx as N.Nocht).getCtx() : (this.ctx as HTMLElement|Document);
    }

    tick(fn: () => void) {
        tick.call(this, fn);
        return this;
    }

    on(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht {
        return on.call(this, events, callback, options);
    }

    off(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht {
        return off.call(this, events, callback, options);
    }

    one(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht {
        options.once = true;
        return on.call(this, events, callback, options);
    }

    trigger(eventName: string, detail?: Record<string, any>): N.Nocht {
        return trigger.call(this, eventName, detail);
    }

    constructor(items: T[] = [], ctx: N.Context) {
        super(...items);

        this.ctx = ctx;
    }

    querySelectorAll(selector: string) {
        return this.ctx.querySelectorAll(selector);
    }

    get length(): number {
        return this.items?.size ?? 0;
    }
}

type Selector = string|Element|ArrayLike<Element>|Document;
type Initializer = () => void;
type SelectorOrInitializer = Selector | Initializer;

// Is a root nocht necessary? commenting out for now
// const $root = nocht(document);

export function nocht(selectorOrInitializer?: SelectorOrInitializer, ctx: N.Context = document) {
    let items:(Document|Element)[] = [];
    switch(true) {
        // don't pass anything
        case !selectorOrInitializer:
            break;
        case isString(selectorOrInitializer!):
            const els = ctx.querySelectorAll(selectorOrInitializer as string);
            if (els !== null)
                items.push(...Array.from(els));
            break;
        // pass a ready function
        case isFunction(selectorOrInitializer!):
            const $ = new Nocht(items, ctx);
            return $.ready(selectorOrInitializer as Initializer);
        // pass the document
        case Object.is(selectorOrInitializer!, document):
            items.push(document);
            break;
        // Pass an element
        case 'nodeType' in (selectorOrInitializer! as Element):
            items.push(selectorOrInitializer! as Element);
            break;
        // case is html string
        case isArray(selectorOrInitializer!) && selectorOrInitializer!.every(el => el instanceof HTMLElement):
            items.push(...(selectorOrInitializer as Element[]));
            break;

    }
    return new Nocht(items, ctx);
}