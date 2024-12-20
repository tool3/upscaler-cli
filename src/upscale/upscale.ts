// @ts-ignore
import Upscaler from 'upscaler/node-gpu';
import { node } from '@tensorflow/tfjs-node-gpu';
import fs from 'fs/promises';
import path from 'path';
import { getModel, verifyModel } from './model';
import { getFileName, isDirectory, spinOk } from './utils';

async function upscale(argv: any) {
  let fileNames = [];
  const inputImage = path.resolve(argv.path);
  const isDir = await isDirectory(inputImage)

  const modelPath = await verifyModel(argv.model);
  const model = getModel(modelPath, argv.scale);

  if (isDir) {
    const files = await fs.readdir(inputImage);
    fileNames = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
  } else {
    fileNames = [inputImage.split('/').pop()];
  }

  for (const name of fileNames) {
    const { directory, upscaledName } = await getFileName(argv, name, isDir);
    const spinner = spinOk(`\x1b[32;1mUpscaling \x1b[0;2m${name}\x1b[0;1m \x1b[32;1mby \x1b[0;2m${argv.scale}\x1b[0;1m \x1b[32;1musing \x1b[0;2m${argv.model}\x1b[0m\x1b[0m`);

    const output = await upscaleImage(model, name, inputImage, directory, upscaledName, argv);
    spinner.succeed();

    const finish = spinOk(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${output}\x1b[0m`);
    finish.succeed();
  }
}

async function upscaleImage(model: any, name: string, inputImage: string, directory: string, upscaledName: string, argv: any) {
  const input = path.extname(inputImage) ? inputImage : `${inputImage}/${name}`;
  const output = `${directory}/${upscaledName}`;

  const upscaler = new Upscaler({ model });
  const upscaled = await getUpscaledImage(upscaler, input);
  await fs.writeFile(output, upscaled);

  return output;
}

async function getUpscaledImage(upscaler: Upscaler, imagePath: string) {
  const file = await fs.readFile(imagePath);
  const image = node.decodeImage(file, 3);

  const tensor = await upscaler.upscale(image);
  const upscaledTensor = await node.encodePng(tensor);

  image.dispose();
  tensor.dispose();

  return upscaledTensor;
};



export default upscale;
