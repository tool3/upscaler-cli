const path = require('path');
const fs = require('fs').promises;
const Upscaler = require('upscaler/node');
const tf = require('@tensorflow/tfjs-node');
const upscaler = new Upscaler();

async function upscaleImage(argv) {
  const image = path.resolve(argv.path);
  const png = await getUpscaledImage(image);
  const pathSplit = image.split('/');
  const name = pathSplit[pathSplit.length - 1].replace('.png', '');
  await fs.writeFile(`${name}_upscaled.png`, png);
  console.log(`📸 \x1b[32;1m${argv.path}.png\x1b[0m \x1b[32mwas saved at \x1b[0;2m${path.resolve(argv.path)}\x1b[0m`);
}

const getUpscaledImage = async (imagePath) => {
  const file = await fs.readFile(imagePath);
  const image = tf.node.decodeImage(file, 3);
  const tensor = await upscaler.upscale(image, {
    output: 'tensor',
    patchSize: 64,
    padding: 6
  });
  image.dispose();
  const upscaledTensor = await tf.node.encodePng(tensor);
  tensor.dispose();
  return upscaledTensor;
};

module.exports = upscaleImage;
