// @ts-ignore
import Upscaler from 'upscaler/node-gpu';
import path from 'path'
import fs from 'fs/promises';
import { node } from '@tensorflow/tfjs-node-gpu';
import Ora from 'ora';
import { promisify } from 'util';
import proc from 'child_process'

const exec = promisify(proc.exec);

function spinOk(text: string) {
  const spinner = Ora({ color: 'green', text });
  spinner.start()
  return spinner;
}

function spinErr(text: string) {
  const spinner = Ora({ color: 'red', text });
  spinner.fail(text)
  process.exit(1);
}

async function upscaleImage(argv: any) {
  let fileNames = [];
  const inputImage = path.resolve(argv.path);
  const isDir = await fs.stat(inputImage).then(stat => stat.isDirectory()).catch(() => false);

  if (isDir) {
    const files = await fs.readdir(inputImage);
    fileNames = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
  } else {
    fileNames = [inputImage];
  }


  for (const name of fileNames) {
    const { directory, upscaledName } = await getFileName(argv, name);

    const input = path.extname(inputImage) ? inputImage : `${inputImage}/${name}`;
    const output = `${directory}/${upscaledName}`;

    const modelPath = await verifyModel(argv.model || '@upscalerjs/default-model');

    const model = getModel(modelPath, argv.scale);

    const spinner = spinOk(`\x1b[32;1mUpscaling \x1b[;2m${name}\x1b[0m\x1b[0m`);

    const upscaler = new Upscaler({
      model
    });

    const upscaled = await getUpscaledImage(upscaler, input);
    await fs.writeFile(output, upscaled);

    spinner.succeed();
    const finish = spinOk(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${output}\x1b[0m`);
    finish.succeed();

  }
}

function getModel(modelPath: string, scale: string) {
  const customModel = require(modelPath);
  const scaleReversed = [...scale].reverse().join("");
  if ('modelType' in customModel) {
    return customModel;
  } else if (scaleReversed in customModel || scale in customModel) {
    return customModel[scale]
  } else {
    spinErr(`\x1b[31mModel does not support scale: ${scale}\x1b[0m`);
  }
}

async function pathExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

async function verifyModel(module: string) {
  const modulePath = path.join(__dirname, '../node_modules', module);
  const exists = await pathExists(modulePath);

  if (!exists) {
    const spinner = spinOk(`\x1b[32;1mDownloading model \x1b[;2m\x1b[0m\x1b[0m`);
    try {
      await exec(`npm install ${module}`);
    } catch (error) {
      spinErr(`Failed to download model: ${error.message}`);
    }
    spinner.succeed(`\x1b[32mModel downloaded successfully\x1b[0;2m\x1b[0m`);
  }

  return module;
}

async function getFileName(argv: any, inputImage: string) {
  const outputPath = argv.o || argv.dir || process.cwd();
  const exists = await pathExists(outputPath);

  if (!exists) {
    await fs.mkdir(outputPath, { recursive: true });
  }

  const ext = getExtension(inputImage);

  const paths = inputImage.split('/');
  const name = paths[paths.length - 1].replace(ext, '');

  const upscaledName = await getOutputName(outputPath, name, ext);
  const directory = path.resolve(path.join(outputPath));

  return { name, upscaledName, directory, ext };
}

async function getOutputName(dir: string, name: string, ext: string) {
  const fileName = `${name}_upscaled`;
  const fullPath = path.resolve(path.join(dir, fileName + ext));
  const fileExists = await pathExists(fullPath);
  if (fileExists) {
    const files = await fs.readdir(path.resolve(path.join(dir)));
    const numFiles = files.filter(file => file.includes(fileName)).length;
    return `${fileName}_${numFiles}${ext}`
  }
  return `${fileName}${ext}`
}

function getExtension(inputImage: string) {
  const ext = path.extname(inputImage);

  if (!ext) {
    throw '\x1b[31mMust provide an image path with file extension\x1b[0m';
  }

  return ext;
}

async function getUpscaledImage(upscaler: any, imagePath: string) {
  const file = await fs.readFile(imagePath);
  const image = node.decodeImage(file, 3);
  const tensor = await upscaler.upscale(image, {
    output: 'tensor',
    patchSize: 64,
    padding: 6
  });
  image.dispose();
  const upscaledTensor = await node.encodePng(tensor);
  tensor.dispose();
  return upscaledTensor;
};

export default upscaleImage;
