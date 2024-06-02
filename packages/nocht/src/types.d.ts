
type ForEachCallback = (this: N.Nocht, el: Document|Element, index?: number) => void;
type ForEach = (cb: ForEachCallback) => void;


export declare namespace N {
    type ValidNochtKeys = number|symbol|string|nochtSymbol;

    interface Nocht<T> extends Array<T> {
        forEach: ForEach;
        __nocht__: true;
        [Property in ValidNochtKeys]: Property extends number ? HTMLElement : Function;
        querySelectorAll: (selector: string) => null|ArrayLike<Element>;
        getCtx: () => Document|HTMLElement;
        one: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        on: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        off: (eventName: string|Record<string, EventListener>, callback?: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        trigger: (eventName: string, detail?: Record<string, any>) => Nocht;
        has: (selector: string) => Nocht;
        find: (selector: string|Element|(<S extends T>(item: T, index?: number, obj: T[]) => item is S)) => Nocht
    }

    type Context = Document|HTMLElement|Nocht
}