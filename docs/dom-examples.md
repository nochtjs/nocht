# `@nocht/dom` Package

> While Nocht does export a `$` alias like jQuery, in the documentation we only use `nocht`. `$` will refer to jQuery in examples.

By default, there are some methods that may seem standard with jQuery that are not included with Nocht. Simply, modern Javascript and CSS have made some of them obsolete. This is refering to things like the `:has`,`:is`, and `:where` selectors that were recently added.

Given the following HTML:

```html
<ul>
  <li>list item 1</li>
  <li>list item 2
    <ul>
      <li>list item 2-a</li>
      <li>list item 2-b</li>
    </ul>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
</ul>
```

```js
// In jQuery
$('li').has('ul').css('background-color', 'red');

// In Modern Javascript
const lis = document.querySelectorAll('li:has(ul)');
lis.forEach(li => li.style.backgroundColor = 'red');

// In Nocht
nocht('li:has(ul)').each(el => el.style.backgroundColor = 'red');
```

> An `@nocht/css` package is planned for the future

There are still some functions from jQuery that didn't make it to Javascript or CSS yet. 

This package includes those functions as well as extend the functions that do exist in both jQuery and Javascript, e.g. `.closest()`, to work like they would in jQuery.

