import { hasOwn, isObject } from '@nocht/shared';
import { N } from './index.d';
import { _bind } from './bind';

export function on(
    this: N.Nocht,
    events: string|Record<string, EventListener>,
    callback: EventListener|EventListenerObject,
    options: AddEventListenerOptions = {}
) {

    if (isObject(events)) {
        for (const e in events) {
            on.call(this, e, events[e], options);
        }
        return this;
    }
    if (events.indexOf(' ') > -1) {
        for (const e of events.split(' ')) {
            on.call(this, e, callback, options);
        }
        return this;
    }

    const _cb = _bind(this, hasOwn(callback, 'handleEvent') ? (callback as EventListenerObject).handleEvent : (callback as EventListener)) as EventListener;
    this.forEach(el => {
        el.addEventListener(events, _cb, options);
    })
    return this;
}

export function off(
    this: N.Nocht,
    events: string|Record<string, EventListener>,
    callback: EventListener|EventListenerObject,
    options: AddEventListenerOptions = {}
) {
    if (isObject(events)) {
        for (const e in events) {
            off.call(this, e, events[e], options);
        }
        return this;
    }
    if (events.indexOf(' ') > -1) {
        for (const e of events.split(' ')) {
            off.call(this, e, callback, options);
        }
        return this;
    }
    
    const _cb = _bind(this, hasOwn(callback, 'handleEvent') ? (callback as EventListenerObject).handleEvent : (callback as EventListener)) as EventListener;
    this.forEach(el => {
        el.removeEventListener(events, _cb, options);
    })

    return this;
}
