#!/usr/bin/env node

const yargs = require('yargs');
const upscale = require('./utils/upscale');
const logo = require('./utils/logo/logo');

yargs
  .middleware(() => console.log(logo))
  .command('$0 <path>', 'upscale png images by up to 4x', {}, async argv => {
    try {
      await upscale(argv);
    } catch (error) {
      console.error(error);
    }
  })
  .command(['list', 'ls'], 'list upscale models and their supported scale', {}, async argv => {
    console.log(
      `\x1b[0;2m
   • @upscalerjs/esrgan-slim               2x 3x 4x 8x
   • @upscalerjs/esrgan-medium             2x 3x 4x 8x
   • @upscalerjs/esrgan-thick              2x 3x 4x 8x
   • @upscalerjs/esrgan-legacy             div2kx2 div2kx3 div2kx4 gans
   • @upscalerjs/maxim-deblurring          64 256
   • @upscalerjs/maxim-dehazing-indoor     64 256
   • @upscalerjs/maxim-dehazing-outdoor    64 256
   • @upscalerjs/maxim-denoising           64 256
   • @upscalerjs/maxim-deraining           64 256
   • @upscalerjs/maxim-enhancement         64 256
   • @upscalerjs/maxim-retouching          64 256    
   \x1b[0m
      `
    )
  })
  .example('$0 image.png')
  .option('name', { alias: 'n', type: 'string', desc: 'output image name' })
  .option('output', { alias: 'o', type: 'string', desc: 'path to save image' })
  .option('model', { alias: 'm', type: 'string', desc: 'model to use' })
  .option('scale', { alias: 's', type: 'string', default: 'x2', desc: 'scale of model to use' })
  // TODO 
  // add custom model func
  .help()
  .wrap(90).argv;
