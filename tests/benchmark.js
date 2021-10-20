/*!  Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
*/
//
// Test encode and decode performance for different input sizes.  Outputs
// encode/decode input size, duration in ns, avg time/iteration, and avg
// time/element in ns. CSV output can be plotted with a spreadsheet.
//
// # human output:
// $ node benchmark.js
//
// # CSV output:
// $ CSV=true node benchmark.js
//
const t = process.hrtime.bigint;

import {
  encode, decode
} from '../lib/index.js';
import crypto from 'crypto';

// max per test loop
const tMax = 2000000000n;

const csv = !!JSON.parse(process.env.CSV || 'false');

function logStart() {
  if(csv) {
    console.log(
      'n' +
      ',enc i,enc dt,enc t/i,enc t/n' +
      ',dec i,dec dt,dec t/i,dec t/n');
  } else {
    console.log('benchmarking...');
  }
}
function logStats({n, e_i, e_dt, d_i, d_dt}) {
  const e_t_per_i = e_dt / BigInt(e_i);
  const e_t_per_n = e_dt / BigInt(e_i) / BigInt(n);
  const d_t_per_i = d_dt / BigInt(d_i);
  const d_t_per_n = d_dt / BigInt(d_i) / BigInt(n);
  if(csv) {
    console.log(
      `${n}` +
      `,${e_i},${e_dt},${e_t_per_i},${e_t_per_n}` +
      `,${d_i},${d_dt},${d_t_per_i},${d_t_per_n}`);
  } else {
    console.log(
      `n=${n}` +
      ` e_i=${e_i} e_dt=${e_dt} e_t/i=${e_t_per_i} e_t/n=${e_t_per_n}` +
      ` d_i=${d_i} d_dt=${d_dt} d_t/i=${d_t_per_i} d_t/n=${d_t_per_n}`);
  }
}
function logEnd() {
  if(csv) {
  } else {
    console.log('done');
  }
}

function* mx(inc, n0, n) {
  for(let i = n0; i <= n; i++) {
    yield inc * i;
  }
}
const sizes = [
  1, 2, 4, 8, 16,
  // by 32, 32 to 1k
  ...mx(32, 1, 32),
  // by 128, 1k to 8k
  ...mx(128, 9, 64),
  // by 256, 8k to 16k
  ...mx(256, 33, 64)
];
//console.log(sizes.length, JSON.stringify(sizes)); process.exit();
logStart();
for(const n of sizes) {
  // setup
  const input = new Uint8Array(n);
  crypto.randomFillSync(input);

  // encode test
  const e_start = t();
  let e_i = 0;
  let e_dt;
  do {
    encode(input);
    e_dt = t() - e_start;
    e_i++;
  } while(e_dt < tMax);

  // decode test
  const d_start = t();
  let d_i = 0;
  let d_dt;
  const encoded = encode(input);
  do {
    decode(encoded);
    d_dt = t() - d_start;
    d_i++;
  } while(d_dt < tMax);

  logStats({n, e_i, e_dt, d_i, d_dt});
}
logEnd();
