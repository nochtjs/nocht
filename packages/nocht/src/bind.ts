import type { N } from "./types";

const m = new Map<Function, Function>();

// This binding solution only works for the simplest of cases
// such as assigning 1 event listener to 1 element
// adding more to it than that will cause issues
export const _bind = (instance: N.Nocht|Element|Document, fn: Function) => {
    if (!m.has(fn)) {
        m.set(fn, fn.bind(instance));
    }

    return m.get(fn);
}