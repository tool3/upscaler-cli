const path = require('path');
const fs = require('fs').promises;
const Upscaler = require('upscaler/node');
const tf = require('@tensorflow/tfjs-node');
const upscaler = new Upscaler();
const Ora = require('ora');



async function upscaleImage(argv) {
  const imagePath = path.resolve(argv.path);
  const ext = path.extname(imagePath);
  const pathSplit = imagePath.split('/');
  const name = pathSplit[pathSplit.length - 1].replace(ext, '');
  const fileName = `${name}_upscaled.png`;
  
  const spinner = new Ora({ color: 'green', text: `\x1b[32;1mUpscaling \x1b[;2m${name}\x1b[0m\x1b[0m` })
  spinner.start();

  const png = await getUpscaledImage(imagePath);
  
  
  const upscaledImagePath = [...pathSplit.slice(0, pathSplit.length - 1), fileName].join('/');

  await fs.writeFile(fileName, png);
  spinner.succeed(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${upscaledImagePath}\x1b[0m`);
}

const getUpscaledImage = async imagePath => {
  const file = await fs.readFile(imagePath);
  const image = tf.node.decodeImage(file, 3);
  const tensor = await upscaler.upscale(image, {
    output: 'tensor',
    patchSize: 128,
    padding: 6
  });
  image.dispose();
  const upscaledTensor = await tf.node.encodePng(tensor);
  tensor.dispose();
  return upscaledTensor;
};

module.exports = upscaleImage;
