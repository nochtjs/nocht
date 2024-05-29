# A note about `.ready`

Nocht is an ECMAScript Module package. This means it should *always* be added within a module context. This means that [ready events have probably already fired](https://www.youtube.com/watch?v=_iq1fPjeqMQ). In jQuery land, `.ready` is shorthand for "Run this function when the document is ready or window is done loading." Likely all jQuery code that is not a plugin happens inside of a `.ready` callback to some extent. With faster internet and best practices around loading JavaScript developing, it meant that `.ready` could be run after both the document was ready and window loaded. In those instances, the function is fired immediately.

## How does Nocht work with this? 

Nocht instead has a simple scheduler. It is based on the scheduler that powers [petite-vue](https://github.com/vuejs/petite-vue/blob/main/src/scheduler.ts) with some changes made to support chaining. Nocht exposes the scheduler in two methods: `.tick` and `.ready`.

## `.tick` vs. `.ready`

> This section assumes you understand [browser event loop, `setTimeout`, micro tasks, `requestAnimationFrame`, and `requestIdleCallback`](https://www.youtube.com/watch?v=cCOL7MC4Pl0). Follow the link for a presentation by Jake Archibald about how they all interact.

Most of the time, they will be the same thing. In fact, `.tick` is used inside of the `.ready` function. 

Here's how you can think of it:

- Can my function run at any point in the immediate future, and it's fine if it is added to a queue of other functions?
    - [Use `.ready`](/core/scheduler#ready)
- Does my function need to run at the next possible moment?
    - [Use `.tick`](/core/scheduler#tick)
- Does my function depend on something else happening inside of a `.tick` or `.ready`?
    - [Use the same function the the dependency is using](/core/scheduler#why-is-this-undefined)
- Does it not matter when my function runs? Do I understand enough about `requestAnimationFrame` and the event loop to do it myself?
    - Don't worry about using either.

## Caveats

There are some caveats to the bulleted explanation. You can get a deeper understanding of them by [checking out this brief explainer on when `.tick` and `.ready` run](/core/scheduler/#i-m-using-tick-and-ready-but-things-are-still-out-of-order).