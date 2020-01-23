# Base58 Universal Encoder/Decoder _(base58-universal)_

> Encoder/decoder for [The Base58 Encoding Scheme][] for [Node.js][] and Web browsers

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Security

TBD

## Background

This library provides an encoder and decoder for [The Base58 Encoding Scheme][]
using an alphabet popularized by Bitcoin. It works in both [Node.js][] and in
Web browsers with no dependencies.

## Install

- Node.js 8.3+ required.

To install for [Node.js][] or in a Web project using npm:

```
npm install base58-universal
```

To install locally or for development:

```
git clone https://github.com/digitalbazaar/base58-universal.git
cd base58-universal
npm install
```

## Usage

The library can be loaded with CommonJS or ESM:

```js
const {encode, decode} = require('base58-universal');
````

```js
import {encode, decode} from 'base58-universal';
```

### Encoding

* `encode(input[, maxline])`
  * **`input`**: `Uint8Array` - bytes to encode
  * **`maxline`**: `Number` - maximum number of encoded characters per line to
    use, defaults to infinite.
  * Returns a base58 encoded string.

```js
import {encode} from 'base58-universal';

const input = Uint8Array([1, 2, 3, 4]);
const encoded = encode(input);
// > 2VfUX

const input2 = Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const encoded2 = encode(input2, 8);
// > 4HUtbHhN\r\n2TkpR

// Browsers use global TextEncoder to convert strings
const input3 = new TextEncoder().encode('abc');
const encoded3 = encode(input3);
// > ZiCa

// Node.js uses util.TextEncoder to convert strings
const nodeTextEncoder = require('util').TextEncoder;
const input4 = new nodeTextEncoder().encode('abc');
const encoded4 = encode(input4);
// > ZiCa
```

### Decoding

* `decode(input)`
  * **`input`**: `String` - string to decode
  * Returns a `Uint8Array` with the decoded bytes.

```js
import {decode} from 'base58-universal';

const input = '2VfUX';
const decoded = decode(input);
// > Uint8Array [ 1, 2, 3, 4 ]

const input2 = '4HUtbHhN\r\n2TkpR';
const decoded2 = decode(input2);
// > Uint8Array [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]
```

## Contribute

Please follow the [Bedrock contributing
guidelines](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md).

PRs accepted.

If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme)
specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar

Encoder/decoder original implementation from
[base-x](https://github.com/cryptocoinjs/base-x) under the MIT License.

[The Base58 Encoding Scheme]: https://github.com/digitalbazaar/base58-spec
[Node.js]: https://nodejs.org/
