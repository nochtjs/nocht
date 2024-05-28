import type { N } from './types';

let queued = false;
const queue = new Map<Function, Function>();
const p = Promise.resolve();

export function tick(this: N.Nocht, fn: () => void) {
    p.then(fn.bind(this));
    return this;
}

export function ready(this: N.Nocht, fn: () => void) {
    if (!queue.has(fn)) queue.set(fn, fn.bind(this));
    if (!queued) {
        queued = true;
        tick.call(this, flush);
    }
}

function flush(this:N.Nocht) {
    const Q = [...queue.values()]
    while(Q.length) {
        Q.shift()?.call(this);
    }

    queue.clear();
    queued = false;
}