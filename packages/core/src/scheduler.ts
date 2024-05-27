/**
 * A simple implementation of the jQuery.Deferred() using Promises.
 * Influenced by the scheduler from petite-vue
 * 
 * If document is not ready,
 * add to callback queue `_q`
 * 
 * else if it is ready, run on "nextTick"
 * 
 * Since it is being loaded as a module, it can only ever be loaded
 * after the DOMContentLoaded event, to adjust for this, 
 */
import { N } from './types.d';

export type ReadyCallback = <T extends PromiseLike<void>>(value: void) => void | T;

let queued = false;
const _q: Function[] = [];
const p = Promise.resolve();

const flush = () => {
    while(_q.length) {
        _q.shift()?.();
    }
    _q.length = 0;
    queued = false;
}

export function queue(this:N.Nocht, fn: ReadyCallback) {
    if (!_q.includes(fn)) _q.push(fn);
    if (!queued) {
        queued = true;
        requestIdleCallback(flush, {
            timeout: 1000
        });
    }
    return this;
}

/**
 * Similar to "nextTick" in petite-vue
 */
export function then(this: N.Nocht, fn: ReadyCallback, shouldQueue = false) {
    if (shouldQueue) {
        queue.bind(this, fn)
    } else {
        p.then(fn);
    }
    return this;
}

function done() {
    document.removeEventListener('DOMContentLoaded', done);
    window.removeEventListener('load', done)

    flush();
}

if (document.readyState !== 'loading') {
    p.then(flush);
} else {
    document.addEventListener('DOMContentLoaded', done);
    window.addEventListener('load', done);
}