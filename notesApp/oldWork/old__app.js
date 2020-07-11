const fs = require('fs');
const { name, add, nameToHex } = require('./utils.js');

fs.writeFileSync('notes.txt', `My name is ${name} \n`);

fs.appendFileSync('notes.txt', `The number I like a lot is ${nameToHex()}`);
