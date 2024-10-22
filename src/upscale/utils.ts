import Ora from 'ora';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';
import proc from 'child_process'

const exec = promisify(proc.exec);

async function isDirectory(inputPath: string) {
    return await fs.stat(inputPath).then(stat => stat.isDirectory()).catch(() => false);
}

async function pathExists(path: string) {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

async function getFileName(argv: any, inputImage: string, isDir: boolean) {
    const outputPath = argv.o || (isDir ? argv.dir : false) || process.cwd();
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

function getExtension(inputImage: string) {
    const ext = path.extname(inputImage);

    if (!ext) {
        spinErr('\x1b[31mMust provide an image path with file extension\x1b[0m');
    }

    return ext;
}

export { exec, isDirectory, pathExists, getFileName, getExtension, spinOk, spinErr };