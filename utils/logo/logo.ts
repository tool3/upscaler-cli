import fs from 'fs';
export default fs.readFileSync(__dirname + '/logo.txt').toString()