import path from 'path';
import { exec, pathExists, spinErr, spinOk } from './utils';

async function verifyModel(module: string) {
    const modulePath = path.join(__dirname, '../node_modules', module);
    const exists = await pathExists(modulePath);

    if (!exists) {
        const spinner = spinOk(`\x1b[32;1mDownloading model \x1b[;2m\x1b[0m\x1b[0m`);

        try {
            await exec(`npm install ${module}`, { cwd: path.join(__dirname, '../../') });
        } catch (error) {
            spinErr(`Failed to download model: ${error.message}`);
        }

        spinner.succeed(`\x1b[32mModel downloaded successfully\x1b[0;2m\x1b[0m`);
    }

    return module;
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

export { verifyModel, getModel }