# Getting Started

Nocht is meant to be a dead simple, modern, tree-shakable, lovely-to-use library that can be dropped in with little expense paid.

## Installation

This project uses the package manager `pnpm`, so all terminal examples use it as well. Feel free to use your preferred package manager:

```sh
# Install the core library
pnpm add nocht

# Install any plugins
pnpm add @nocht/dom @nocht/css @nocht/fetch
```

## Usage

Nocht exports two modules from the core package, `nocht` and `$`. `$` is an alias to the `nocht` function, much like how `$` is an alias to the `jQuery` object. You can learn [more about the differences between the two here](/differences).

```js
import { $ } from 'nocht';

$(document).ready(doSomeDomStuff)
```