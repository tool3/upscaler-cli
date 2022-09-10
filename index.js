#!/usr/bin/env node

const yargs = require('yargs');
const upscale = require('./commands/upscale');

yargs
  .config({
    location: `${process.env.INIT_CWD || process.cwd()}/shellfies`
  })
  .command('$0 <path>', 'upscale png images by 4x', {}, async (argv) => {
    try {
      await upscale(argv);
    } catch (error) {
      console.error(error);
    }
  })
  .example('$0 image.png')
  .option('name', { alias: 'n', type: 'string', desc: 'image name' })
  .help()
  .wrap(90).argv;
