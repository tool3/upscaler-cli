const fs = require('fs');
module.exports = fs.readFileSync(__dirname + '/logo.txt').toString()