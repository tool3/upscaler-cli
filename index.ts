#!/usr/bin/env node

import yargs from 'yargs';
import upscale from './src/upscale/upscale';
import logo from './src/logo/logo';
import list from './src/list/list'

yargs
  .middleware(() => console.log(logo))
  .command(
    '$0 <path|dir>',
    'upscale images using AI models',
    {},
    async argv => {
      try {
        await upscale(argv);
      } catch (error) {
        console.error(error);
      }
    })
  .command(
    ['list', 'ls'],
    'list upscale models and their supported scale',
    {},
    async _argv => {
      list();
    })
  .option('name', { alias: 'n', type: 'string', desc: 'output image name' })
  .option('output', { alias: 'o', type: 'string', desc: 'path to save image' })
  .option('model', { alias: 'm', type: 'string', desc: 'model to use' })
  .option('scale', { alias: 's', type: 'string', default: '2x', desc: 'scale of model to use' })
  .example('$0 ls', 'list upscale models and their supported scale')
  .example('$0 toUpscale/', 'upscale all png images in directory')
  .example('$0 alien_landscape.png -s 4x', 'upscale image by 4x')
  .example('$0 alien_landscape.png -m @upscalerjs/esrgan-medium -s 8x', 'upscale image by 8x using custom model')
  .demandCommand(1, '')
  .help()
  .wrap(100).argv;