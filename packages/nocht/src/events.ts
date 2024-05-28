import { hasOwn, isObject } from '@nocht/shared';
import type { N } from './types';
import { _bind } from './bind';

export function on(
    this: N.Nocht,
    events: string|Record<string, EventListener>,
    callback?: EventListenerOrEventListenerObject,
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
    
    if (!callback) {
        if (import.meta.env.DEV) {
            console.warn('Attempted to add event listener without specifying a handler', { events, callback, options });
            return this;
        }
    }
    
    
    this.forEach(el => {
        const _cb = _bind(el, hasOwn(callback!, 'handleEvent') ? (callback as EventListenerObject).handleEvent : (callback as EventListener)) as EventListener;
        el.addEventListener(events, _cb, options);
    })
    return this;
}

export function off(
    this: N.Nocht,
    events: string|Record<string, EventListener>,
    callback?: EventListenerOrEventListenerObject,
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

    if (!callback) {
        if (import.meta.env.DEV) {
            console.warn('Attempted to remove event listener without specifying a handler', { events, callback, options });
            return this;
        }
    }
    
    
    this.forEach(el => {
        const _cb = _bind(this, hasOwn(callback!, 'handleEvent') ? (callback as EventListenerObject).handleEvent : (callback as EventListener)) as EventListener;
        el.removeEventListener(events, _cb, options);
    })

    return this;
}

export function trigger(this: N.Nocht, eventName: string, detail?: Record<string, any>) {
    const event = isObject(detail) ? new CustomEvent(eventName, { detail }) : new Event(eventName);

    this.forEach(el => {
        el.dispatchEvent(event);
    })

    return this;
}