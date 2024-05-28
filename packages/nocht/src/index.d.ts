
type ForEachCallback = (this: N.Nocht, el: Document|Element, index?: number) => void;
type ForEach = (cb: ForEachCallback) => void;
export declare namespace N {
    type ValidNochtKeys = number|symbol|string;

    interface Nocht extends Array {
        forEach: ForEach;
        [Property in ValidNochtKeys]: Property extends number ? HTMLElement : Function;
        querySelectorAll: (selector: string) => null|ArrayLike<Element>;
        getCtx: () => Document|HTMLElement;
        one: (eventName: string, callback: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        on: (eventName: string, callback: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
        off: (eventName: string, callback: EventListener|EventListenerObject, options?: AddEventListenerOptions) => Nocht;
    }
    type Context = Document|HTMLElement|Nocht
}