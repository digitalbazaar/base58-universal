/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {
  encode as _encode,
  decode as _decode
} from './baseN.js';

// base58 characters (Bitcoin alphabet)
function getAlphabet () {
  return '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
}

export function encode(input, maxline) {
  return _encode(input, getAlphabet(), maxline);
}

export function decode(input) {
  return _decode(input, getAlphabet());
}
