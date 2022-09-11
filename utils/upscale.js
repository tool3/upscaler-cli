const path = require('path');
const fs = require('fs').promises;
const Upscaler = require('upscaler/node-gpu');
const tf = require('@tensorflow/tfjs-node-gpu');
const Ora = require('ora');
const spinner = new Ora({ color: 'green', text: `\x1b[32;1mUpscaling \x1b[;2m${name}\x1b[0m\x1b[0m` });

const upscaler = new Upscaler();

async function upscaleImage(argv) {
  const imagePath = path.resolve(argv.path);
  const paths = imagePath.split('/');
  const { name, fileName } = getImageName(imagePath, paths);

  spinner.start();

  const png = await getUpscaledImage(imagePath);
  const upscaledImagePath = [...paths.slice(0, paths.length - 1), fileName].join('/');

  await fs.writeFile(fileName, png);
  spinner.succeed(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${upscaledImagePath}\x1b[0m`);
}

function getImageName(imagePath, paths) {
  const ext = path.extname(imagePath);
  const name = paths[paths.length - 1].replace(ext, '');
  const fileName = `${name}_upscaled.png`;
  return { name, fileName };
}

const getUpscaledImage = async imagePath => {
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
