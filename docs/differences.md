# The differences between Nocht and jQuery

## The API

The goal of Nocht is to be as true to the jQuery documentation as possible. This does mean that some functions will not match up 1:1. For example, let's look at the `.on` function. In jQuery the arguments look like this:

```js
function on( elem, types, selector, data, fn, one ) {
```

These arguments are then parsed down as the function goes on. Is `types` an object? Then check if there is `data`, if not make `data` equal `selector` and make `selector` `undefined`. Is there no `data` and no `fn`? Then the `selector` must be the `fn` and `data` and `selector` should be made `undefined`. And so on, and so on.

Infrequent users of jQuery wil be surprised at all the options. What we *know* about the `.on` function is that it accepts a space separated string or object of event names and applies them to the elements inside the jQuery object. Frequent jQuery users might not know that there is no `hover` event in vanilla javascript and that it is an alias for passing `"mouseenter mouseleave

In Nocht, the goal is to capture the usefulness of these functions and support as much of the same functionality as is within reason. For example, the `data` argument can be handled by the `CustomEvent.detail` object. `Nocht.on` supports the space separated string and object of event names syntax, but 

## The Nocht class

When you run `$()`, it creates a `jQuery` object that has all the goodies inside. When you run `nocht()`, it creates a Nocht class which extends the Array primitive. This means a smaller package for you. No more managing the `.length` property, and many utility functions on the `jQuery` object are built in, `.inArray` becomes `.includes`, `jQuery.makeArray` becomes `Nocht.from`.

## Chaining

Chaining should remain mostly the same, and we've added plenty of testing to make sure that each method that *should* chain does. If you found a method that doesn't chain, or doesn't chain in the expected way, please let us know [by filing an issue](https://github.com/nochtjs/nocht/issue).