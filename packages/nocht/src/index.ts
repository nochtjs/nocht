import { ready, tick } from './scheduler';
import type { N } from './types';
import { isArray, isString, getGuid } from '@nocht/shared';
import { on, off, trigger } from './events';


export class Nocht<T extends Document|Element> extends Array<T> implements N.Nocht<T> {
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
        return (this.ctx as N.Nocht<T>).__nocht__ === true ? (this.ctx as N.Nocht<T>).getCtx() : (this.ctx as HTMLElement|Document);
    }

    tick(fn: () => void) {
        tick.call(this, fn);
        return this;
    }

    on(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht<T> {
        return on.call(this, events, callback, options);
    }

    off(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht<T> {
        return off.call(this, events, callback, options);
    }

    one(events: string | Record<string, EventListener>, callback?: EventListenerOrEventListenerObject, options: AddEventListenerOptions = {}): N.Nocht<T> {
        options.once = true;
        return on.call(this, events, callback, options);
    }

    trigger(eventName: string, detail?: Record<string, any>): N.Nocht<T> {
        return trigger.call(this, eventName, detail);
    }

    constructor(selectorOrInitializer: SelectorOrInitializer = [], ctx: N.Context) {
        const items: T[] = [];

        switch(true) {
            // don't pass anything
            case !selectorOrInitializer:
                break;
            case isString(selectorOrInitializer!):
                const els = ctx.querySelectorAll(selectorOrInitializer as string);
                if (els !== null)
                    items.push(...Array.from<T>(els as ArrayLike<T>));
                break;
            // pass the document
            case Object.is(selectorOrInitializer!, document):
                items.push(document as T);
                break;
            // Pass an element
            case 'nodeType' in (selectorOrInitializer! as Element):
                items.push(selectorOrInitializer! as T);
                break;
            // case is html string
            case isArray(selectorOrInitializer!) && selectorOrInitializer!.every(el => el instanceof HTMLElement):
                items.push(...(selectorOrInitializer as unknown as T[]));
                break;
        }

        super(...items);

        this.ctx = ctx;
    }

    querySelectorAll(selector: string) {
        return this.ctx.querySelectorAll(selector);
    }

    has(selector: string) {
        const elements = Nocht.from(this);

        return new Nocht(elements.filter(el => el.querySelector(selector) !== null) as Element[], this.ctx);
    }

    // @ts-ignore
    find(selector: string|Element|(<S extends T>(item:T, index?: number, obj?: T[]) => item is S)) {
        switch(true) {
            case typeof selector === 'string': {
                const output:Element[] = [];
                this.forEach(el => {
                    const found = [...el.querySelectorAll(selector)];
                    output.push(...found);
                });
                return new Nocht([...new Set(output)], this.ctx);
            }
            case selector instanceof Element: {
                const output:Element[] = [];
                this.forEach(el => {
                    const children = [...el.querySelectorAll('*')];
                    children.forEach(el => {
                        if (Object.is(el, selector)) {
                            output.push(el);
                        }
                    });
                })
                return new Nocht([...new Set(output)], this.ctx);
            }
            case typeof selector === 'function':
                const found = [ super.find((...args) => selector(...args)) ].filter(item => typeof item !== 'undefined') as Selector;
                return new Nocht(found, this.ctx);
        }

        return new Nocht([], this.ctx);
    }
    
    add(selector: string|Element, ctx: N.Context = this.ctx) {
        const elsToAdd = [];
        if (typeof selector === 'string') {
            elsToAdd.push(...ctx.querySelectorAll(selector))
        } else if (selector instanceof Element) {
            elsToAdd.push(selector)
        }
        return new Nocht([...new Set([...this, ...elsToAdd])], ctx);
    }

    children(selector?: string) {
        const children = this.reduce<Element[]>((acc, nextEl) => {
            const c = Array.from(nextEl.children);
            
            acc = acc.concat(c.filter(el => selector ? el.matches(selector) : true));
            return acc;
        }, [])

        return new Nocht(children, this.ctx);
    }

    closest(selector: string|Element, ctx: N.Context = this.ctx) {
        const output: HTMLElement[] = [];
        if (selector instanceof Element) {
            selector = selector.id || (selector.id = `nocht${getGuid()}`);
        }
        if (typeof selector === 'string') {
            this.forEach(el => {
                if(!Object.is(document, el)) {
                    // @ts-ignore
                    output.push((el as HTMLElement).closest(selector) ?? false);
                }
            })
        }
        
        return new Nocht([...new Set(output.filter(Boolean))], ctx);
    }
}

type Selector = string|Element|ArrayLike<Element>|Document;
type Initializer = () => void;
type SelectorOrInitializer = Selector | Initializer;

// Is a root nocht necessary? commenting out for now
// const $root = nocht(document);

export function nocht(selectorOrInitializer?: SelectorOrInitializer, ctx: N.Context = document) {
    return new Nocht(selectorOrInitializer, ctx);
}