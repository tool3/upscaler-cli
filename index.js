#!/usr/bin/env node

const yargs = require('yargs');
const some_command = require('./commands/some_command');

yargs
    .config(
        {
            // config here
            // will be available on argv
        })
    .command(
        ['some_command', 'l'],
        'some_command description',
        { },
        async argv => {
            some_command(argv);
        })
    .example('$0 some_command --some_option', 'example command')
    .option('some_option', { alias: 's', type: 'boolean', default: false, desc: 'some option', required: true })
    .demandCommand(1, '')
    .help()
    .wrap(72)
    .argv