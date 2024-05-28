
type ForEachCallback = (this: N.Nocht, el: Document|Element, index?: number) => void;
type ForEach = (cb: ForEachCallback) => void;


export declare namespace N {
    type ValidNochtKeys = number|symbol|string|nochtSymbol;

    interface Nocht extends Array {
        forEach: ForEach;
        __nocht__: true;
        [Property in ValidNochtKeys]: Property extends number ? HTMLElement : Function;
        querySelectorAll: (selector: string) => null|ArrayLike<Element>;
        getCtx: () => Document|HTMLElement;
        one: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        on: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        off: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        trigger: (eventName: string, detail?: Record<string, any>) => Nocht;
    }

    type Context = Document|HTMLElement|Nocht
}