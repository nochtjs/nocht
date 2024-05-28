# Events

Events work very similar to how they do in jQuery. There are some [differences](/differences#the-api) that we have gone into.

## Event aliases

Currently none of the event aliases have been implemented. This means things like `.click` will throw an error. They may be added in the future, but it depends on how many bytes it would take to do so.

## `.on`

```ts
function on(this: Nocht, events: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): Nocht
```

### Example

```ts
const $ = nocht(document);

$.on('click keydown', function(e) {
    if (e.type === 'click') {
        console.log('Wahoo a click!')
    }
    if (e.type === 'keydown') {
        console.log('Ooooo, was that a mechanical keyboard?')
    }
});
```

## `.off`

```ts
function off(this: Nocht, events: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): Nocht;
```

### Example

```ts
// off works same as removeEventListener
// all arguments must match the addEventListener
// arguments or else the event won't be
// removed properly
$.on('click keydown', callback);

$.off('click keydown', callback);
```

## `.one`

An alias for `$.on(events, callback, { once: true });

```ts
function one(this: Nocht, events: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): Nocht;
```

### Example

```ts
$.one('click', console.log);
```

