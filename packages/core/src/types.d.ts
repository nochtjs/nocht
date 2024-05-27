
export declare namespace N {
    type Selector = string|object|HTMLElement|ArrayLike<HTMLElement>|Nocht;
    type Context = Document|HTMLElement|Nocht;

    interface Nocht {
        [key: string]: any;
        #items: Map<number, HTMLElement>;
        ctx: N.Context;
        fn: object; // Nocht.prototype;
        get length(): number;
        ready(fn: ReadyCallback): this;
        then(fn: ReadyCallback): this;
    }
}