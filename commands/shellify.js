const shellfie = require('shellfie');

async function shellify(argv) {
    const options = {};
    if (argv.width || argv.height) {
        const viewport = { ...argv };
        argv.viewport = viewport;
    }
    const name = argv.name || 'a random image';
    Object.assign(options, argv);
    await shellfie(argv._, options);    
    console.log(`📸 \x1b[32;1m${name}\x1b[0m \x1b[32mwas saved at \x1b[0;2m${argv.location}\x1b[0m`)
}

module.exports = shellify;