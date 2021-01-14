const shellfie = require('shellfie');
const path = require('path');

async function shellify(argv) {
    const options = {};
    if (argv.width || argv.height) {
        const viewport = { ...argv };
        argv.viewport = viewport;
    }
    const name = argv.name || 'a randomly named image';
    Object.assign(options, argv);
    const { string , location } = argv;
    await shellfie(string, options);    
    console.log(`📸 \x1b[32;1m${name}.png\x1b[0m \x1b[32mwas saved at \x1b[0;2m${path.resolve(location)}\x1b[0m`)
}

module.exports = shellify;