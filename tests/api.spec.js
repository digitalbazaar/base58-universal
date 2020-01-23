/*!
 * Copyright (c) 2018-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const chai = require('chai').use(require('chai-bytes'));
const env = require('./env');
const should = chai.should();

if(env.nodejs) {
  global.TextEncoder = require('util').TextEncoder;
}

const {encode, decode} = require('..');

/* eslint-disable max-len */
// https://github.com/bitcoin/bitcoin/blob/master/src/test/data/base58_encode_decode.json
const bitcoinVectors = [
  ['', ''],
  ['61', '2g'],
  ['626262', 'a3gV'],
  ['636363', 'aPEr'],
  ['73696d706c792061206c6f6e6720737472696e67', '2cFupjhnEsSn59qHXstmK2ffpLv2'],
  ['00eb15231dfceb60925886b67d065299925915aeb172c06647', '1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L'],
  ['516b6fcd0f', 'ABnLTmg'],
  ['bf4f89001e670274dd', '3SEo3LWLoPntC'],
  ['572e4794', '3EFU7m'],
  ['ecac89cad93923c02321', 'EJDM8drfXA6uyA'],
  ['10c8511e', 'Rt5zm'],
  ['00000000000000000000', '1111111111'],
  ['000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5', '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff', '1cWB5HCBdLjAuqGGReWE3R3CguuwSjw6RHn39s2yuDRTS5NsBgNiFpWgAnEx6VQi8csexkgYw3mdYrMHr8x9i7aEwP8kZ7vccXWqKDvGv3u1GxFKPuAkn8JCPPGDMf3vMMnbzm6Nh9zh1gcNsMvH3ZNLmP5fSG6DGbbi2tuwMWPthr4boWwCxf7ewSgNQeacyozhKDDQQ1qL5fQFUW52QKUZDZ5fw3KXNQJMcNTcaB723LchjeKun7MuGW5qyCBZYzA1KjofN1gYBV3NqyhQJ3Ns746GNuf9N2pQPmHz4xpnSrrfCvy6TVVz5d4PdrjeshsWQwpZsZGzvbdAdN8MKV5QsBDY']
].map(([hexString, result]) => [_fromHexString(hexString), result]);
/* eslint-enable max-len */

const testVectors = [
  // from spec
  [
    'Hello World!',
    '2NEpo7TZRRrLZSi2U'
  ],
  [
    'The quick brown fox jumps over the lazy dog.',
    'USm3fpXnKG5EUBx2ndxBDMPVciP5hGey2Jh4NDv6gmeo1LkMeiKrLJUUBk6Z'
  ],
  [
    [0x00, 0x00, 0x28, 0x7f, 0xb4, 0xcd],
    '11233QC4'
  ],
  // misc
  [
    [],
    ''
  ],
  [
    '',
    ''
  ],
  [
    'a',
    '2g'
  ],
  [
    'ab',
    '8Qq'
  ],
  [
    'abc',
    'ZiCa'
  ],
  [
    [0x00],
    '1'
  ],
  [
    [0x00, 0x00],
    '11'
  ],
  ...bitcoinVectors
].map(([data, result]) => [_toUint8Array(data), result]);

describe('base58-universal APIs', () => {
  describe('encode', () => {
    it('should properly encode', async () => {
      /* eslint-disable-next-line no-unused-vars */
      const results = testVectors.map(([input, _]) => {
        return [
          input,
          encode(input)
        ];
      });
      results.forEach((r, i) => {
        r[0].should.equalBytes(testVectors[i][0]);
        r[1].should.equal(testVectors[i][1]);
      });
    });
    it('throws TypeError on invalid input', async () => {
      let result;
      let error;
      try {
        // attempt to provide a number as a parameter
        result = encode(1235232);
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      (error instanceof TypeError).should.be.true;
    });
  }); // end encode

  describe('decode', () => {
    it('should properly decode data', async () => {
      /* eslint-disable-next-line no-unused-vars */
      const results = testVectors.map(([_, encoded]) => {
        return [
          decode(encoded),
          encoded
        ];
      });
      results.forEach((r, i) => {
        r[0].should.equalBytes(testVectors[i][0]);
        r[1].should.equal(testVectors[i][1]);
      });
    });
  }); // end decode
});

function _toUint8Array(data) {
  if(typeof data === 'string') {
    // convert data to Uint8Array
    return new TextEncoder().encode(data);
  }
  if(Array.isArray(data)) {
    return new Uint8Array(data);
  }
  if(!(data instanceof Uint8Array)) {
    throw new TypeError('"data" be a string, Array, or Uint8Array.');
  }
  return data;
}

// https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
function _fromHexString(hexString) {
  if(hexString === '') {
    return new Uint8Array();
  }
  return new Uint8Array(hexString
    .match(/.{1,2}/g)
    .map(byte => parseInt(byte, 16)));
}

