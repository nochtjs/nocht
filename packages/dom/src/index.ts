// @ts-ignore
import type { N } from 'nocht';
import { isString } from '@nocht/shared';

export function dom(instance: N.Nocht) {
    return instance;    
}

export function find(this: N.Nocht, selector: string|Element) {
    if (isString(selector)) {
        this.forEach((el: Element) => {
            el;
        })
    }
}