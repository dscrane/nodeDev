const fs = require('fs');
const name = require('./utils.js');

fs.writeFileSync('notes.txt', `My name is ${name} \n`);

fs.appendFileSync('notes.txt', 'This line was appended using node');
