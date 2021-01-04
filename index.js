#!/usr/bin/env node
require('./commands/load').load();
const yargs = require('yargs');
const shellify = require('./commands/shellify');

yargs
    .config({
        location: `${process.env.INIT_CWD || process.cwd()}/shellfies`
    })
    .command(
        '$0',
        'create terminal screenshots from ansi string',
        { },
        async argv => {
            try {
                await shellify(argv);    
            } catch (error) {
                console.error(error);
            }
            
        })
    .example('$0 \x1b[32mI\'m Green! --width 200')
    .option('name', { alias: 'n', type: 'string', desc: 'image name' })
    .option('mode', { alias: 'm', type: 'string', desc: 'input mode (can also be \'raw\')', default: 'default'})
    .option('width', { alias: 'w', type: 'number', desc: 'set width' })
    .option('height', { alias: 'h', type: 'number', desc: 'set height' })
    .option('background', { alias: 'b', type: 'string', desc: 'set background color' })
    .option('foreground', { alias: 'f', type: 'string', desc: 'set default text color' })
    .option('font-family', { alias: 'ff', type: 'string', desc: 'set font family' })
    .option('font-size', { alias: 'fs', type: 'number', desc: 'set font size' })
    .option('font-weight', { alias: 'fw', type: 'string', desc: 'set font weight' })
    .option('location', { alias: 'l', type: 'string', desc: 'destination folder', default: './shellfies' })
    .option('puppeteerArgs', { alias: 'p', type: 'array', desc: 'optional puppeteer args', default: ['--no-sandbox', '--disable-setuid-sandbox']})
    .help()
    .check((argv) => argv._.length ? true: false)
    .wrap(90)
    .argv