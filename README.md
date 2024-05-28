
# Nocht

A modern jQuery-like library that is fully tree-shakable so you only pull in what you need.


## Installation

```zsh
  npm install nocht -D
  npm install @nocht/dom -D
```
    
## Authors

- [@gingerchew](https://www.github.com/gingerchew)


## FAQ

#### Why?

Simply put, modern Javascript is a headache.

#### Why recreate jQuery? 

Nocht is not a jQuery recreation, rather it uses jQuery like an outline. Not every feature from jQuery is going to exist in Nocht. 

For example, `$.ajax` is a fully-featured XHR wrapper that saved thousands of hours for developers. It let's you add custom converters, `beforeSend`, context, data filtering, and about a dozen other things you have probably never used. That was all well and good, but with today's modern Javascript, `fetch` is probably enough for 90% of developer issues. 

`jQuery.Deferred` can be replaced with `Promise` and `async`/`await`.

#### Why is it missing this method from jQuery?

Not every feature of jQuery will be added, and not every feature will be added in exactly the same way as you might imagine.

For example, `.map` in jQuery land returns a jQuery object. In Nocht land, since we extend the Array primitive, you are always working with an array with some Nocht sugar sprinkled on top. Meaning this:

```js
$('[type="checkbox"]')
    .map(function() {
        return this.id;
    })
    .get()
    .join()
```

would become this:

```js
$('[type="checkbox"]')
    .map(function() {
        return this.id
    })
    .join();
```

#### What is `@nocht/plugin` for?

`jQuery.fn` is a simple way to add a plugin to the jQuery object. Want to add your own way of handling arrays?

```js
jQuery.fn.myArrayHandler = function() { ... }
```

Nocht originally planned to add it's own way of adding plugins that worked much the same as `jQuery.fn` but using a method in the `Nocht` class.

```js
const $ = nocht(document);gi
$.use('myArrayHandler', function() { ... });
```

But this is on hold.

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Roadmap

- [ ] Finish `nocht` core package
- [ ] Finish `@nocht/dom` package
- [ ] Finish `@nocht/plugin` package
- [ ] Future planned packages
    - [ ] `@nocht/fetch`
    - [ ] `@nocht/css`
    - [ ] `@nocht/data`
    - [ ] `@nocht/form`
    - [ ] `@nocht/reactive` - An `@vue/reactivity` like library

