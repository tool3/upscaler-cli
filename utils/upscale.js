const path = require('path');
const fs = require('fs').promises;
const Upscaler = require('upscaler/node-gpu');
const tf = require('@tensorflow/tfjs-node-gpu');
const Ora = require('ora');
const GANS = require('@upscalerjs/esrgan-slim');
console.log({GANS});

async function upscaleImage(argv) {
  const inputImage = path.resolve(argv.path);
  const { name, output } = getFileName(argv, inputImage);

  const spinner = new Ora({ color: 'green', text: `\x1b[32;1mUpscaling \x1b[;2m${name}\x1b[0m\x1b[0m` });

  const upscaler = new Upscaler({
    model: GANS
  });

  spinner.start();

  const upscaled = await getUpscaledImage(upscaler, inputImage);

  await fs.writeFile(output, upscaled);
  spinner.succeed(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${output}\x1b[0m`);
}

function getFileName(argv, inputImage) {
  const outputPath = argv.o || process.cwd();
  const ext = getExtension(inputImage);

  const paths = inputImage.split('/');
  const name = paths[paths.length - 1].replace(ext, '');

  const outputName = getOutputName(argv, name);
  const output = path.join(outputPath, outputName);

  return { name, output };
}

function getOutputName(argv, name) {
  if (argv.n) {
    return argv.n?.includes('.') ? argv.n : `${argv.n}.png`;
  }
  return `${name}_upscaled.png`;
}

function getExtension(inputImage) {
  const ext = path.extname(inputImage);

  if (!ext) {
    throw '\x1b[31mMust provide an image path with file extension\x1b[0m';
  }

  return ext;
}

const getUpscaledImage = async (upscaler, imagePath) => {
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
