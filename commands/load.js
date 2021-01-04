#!/usr/bin/env node
const fs = require('fs');

const validOpts = opts => {
  if(!opts || !opts.commands) return true;
  return process.argv[2].includes(opts.commands) ? true : false;
};

module.exports.load = opts => {

  if(!validOpts(opts)) return false;
  if (process.stdin.isTTY) return false;
  
  const BUFSIZE = 65536;
  let nbytes = 0;
  let chunks = [];
  let buffer = '';

  while(true) {
    try {
      buffer = Buffer.alloc(BUFSIZE);
      nbytes = fs.readSync(0, buffer, 0, BUFSIZE, null);
    } 
    catch (e) {
      if (e.code != 'EAGAIN') throw e; 
    }

    if (nbytes === 0) break;
     chunks.push(buffer.slice(0, nbytes));
  }
  
  const stdin = Buffer.concat(chunks).toString();
  if (stdin) {
    process.argv.push(stdin.trim());
    return true;
  }

};
