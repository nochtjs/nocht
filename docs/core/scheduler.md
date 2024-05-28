# Scheduler

Nocht comes with a simple scheduler built in. This is in part due to the fact that ES Modules load after most ready events, and also in part due to predictability.

## `.ready`

The `.ready` function adds the passed function to the queue. Then, on the next "tick", it calls for all the functions in the queue to be run.

This means the code isn't run **_IMMEDIATELY_** but rather when the event loop is ready.

```js
const $ = nocht(document);

$.ready(() => {
    console.log(document.readyState); // 
})
```

## `.tick`

The `.tick` function calls a function on the next possible moment. Essentially, on the next pass of the event loop. You can think of it similar to deferring the function by just a "tick". Similar to how `.nextTick` works in Vue.

For example say you're setting the color of something inside of a `requestAnimationFrame`. The result of that won't be ready on the very next line.

```js
const $ = nocht('button');

$[0].style.color = 'black';
requestAnimationFrame(() => $[0].style.color = 'red');
console.log($[0].style.color); // This is likely still going to log 'black';
$.tick(() => console.log($[0].style.color)) // This is likely going to log 'red';
```

## Which should I use?

The telling factor of which you should use comes down to priority.

- My function needs to run as soon as possible:
    - Does it depend on the result of something happening inside a `.tick` or `.ready`?
        - Then use the same `.tick` or `.ready` that the result is being calculated in.
    - Is it really that important?
        - Then run the function as is, don't worry about scheduling.
    - Is it something that can be deferred?
        - Then use `.ready`
    - Is it not important enough to run immediately, but should be done at the next possible moment?
        - Then use `.tick`
- I already know everything I could possibly need to know about the event loop, `requestAnimationFrame`, `requestIdleCallback`, `queueMicroTask`, promises, execution stack, `setTimeout`, `setInterval`, and the order that everything runs in:
    - Then use whichever feels best to you.

## Why is this not the value I was expecting?

Take the code below for example:

```js
const $ = nocht(document);
let i = 0;
$.ready(() => i += 1);
console.log(i); // 0
```

> For an in-depth, example-filled explanation of what is happening, checkout [this post by Jake Archibald about tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/).

In general, JavaScript runs from top to bottom. But `.ready` and `.tick` will schedule your functions, meaning they will be removed from the "top to bottom" flow. If you keep your scope really clean, you will likely never run into this issue. Take this fixed and contrived example:

```js
const $ = nocht(document);

$.ready(() => {
    let i = 0;
    i += 1;
    console.log(i);
})
```

The variable `i` has been scoped inside of the `.ready`, leaving no room for mistakes.

### I'm using `.tick` and `.ready` but things are still out of order.

Remember `.ready` and `.tick` both schedule functions, but only `.ready` queues functions.

```js
// Here addText is a function that... adds text... to the body
tick(addText('tick 1'));
ready(addText('ready 1'));
tick(addText('tick 2'));
ready(addText('ready 2'));
```

If `.tick` and `.ready` did nothing other than run the functions immediately, then the text would be `tick 1 ready 1 tick 2 ready 2`

The text of your body will likely be `tick 1 ready 1 ready 2 tick 2`. [Check out this CodePen to see it in action.](https://codepen.io/gingerchew/pen/pomNQmq/1dc435f0edc97a9a2113a7607a472d3b?editors=0010)