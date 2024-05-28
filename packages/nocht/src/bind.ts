import { N } from "./index.d";

const wm = new WeakMap<Function, Function>();

export const _bind = (instance: N.Nocht, fn: Function) => {
    if (!wm.has(fn)) {
        wm.set(fn, fn.bind(instance));
    }

    return wm.get(fn);
}