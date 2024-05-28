# Function binding

To make it so that each function chains properly, most functions will return `this`, with `this` being the `nocht` instance was first in the chain.

This means that functions that are used in `.on` need to be bound with the right `this`.

How do we remove that function now? Each time you bind a function, even if it is with the same `this`, it will be a different function if you check with `Object.is`

```js
function myFunc() { ... }
const myContext = { ... };

Object.is(myFunc.bind(myContext), myFunc.bind(myContext)) // false;
```

To handle this, internally there is a `_bind` function that does preflight checks on the function to make sure:

- A. The function has not been bound before
- B. Forget the bound function when the time comes.

It does this by adding the original function as a key to a `Map` with the bound function as the value. Meaning we can now add/remove event listeners safely.

```js
function myListener() { ... }

nocht(document).on('click', myListener);
nocht(document).off('click', myListener); // Without _bind, myListener would not be removed
```

