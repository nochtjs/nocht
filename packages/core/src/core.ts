import { type N } from './types.d'
import { then, type ReadyCallback } from './scheduler';
import { isPlainObject, isFunction } from '@nocht/shared'

export class Nocht implements N.Nocht {
    [key: string]: any;
    ready(fn: ReadyCallback) {
        then.call(this, fn, true);
        return this;
    }

    then(fn: ReadyCallback) {
        then.call(this, fn);
        return this;
    }
    #items = new Map<number, HTMLElement>()
    // Add methods and plugins using nocht().fn.{pluginName} = {pluginDefinition}
    fn = Nocht.prototype;

    get length() {
        return this.#items.size;
    }

    constructor(items: HTMLElement[]|object, public ctx: N.Context) {
        // @ts-ignore change to a map that handles the elements
        for (const [index, el] of Object.entries(items)) {
            typeof index === 'number' ? (this.#items.set(index, el)) : this[index] = el.bind(this);
        }
    }
}



export function nocht(selector: N.Selector, ctx: N.Context = globalThis.document) {
    // selector is '', null, undefined, false
    if (!selector) return new Nocht([], ctx)
    const items: HTMLElement[] = [];
    switch(true) {
        case isPlainObject(selector):
            return new Nocht(selector as object, ctx);
        case isFunction(selector):
            const $ = new Nocht([], ctx);
            const cb:ReadyCallback = () => {selector()};
            $.ready(cb);
            return $;
    }
    return new Nocht(items, ctx);
}

export {
    nocht as $
};