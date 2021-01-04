const some_command = argv => {
    console.log(`Everything is on argv!\n${JSON.stringify(argv, null, 2)}`);
}

module.exports = some_command;