const fs = require('fs');
const { name, add, nameToHex } = require('./utils.js');

fs.writeFileSync('notes.txt', `My name is ${name} \n`);

fs.appendFileSync('notes.txt', `The number I like a lot is ${nameToHex()}`);

// const validator = require('validator');
const { successLog, errorLog, variableLog, textLog } = require('./chalkLogs');
const getNotes = require('./notes.js');

const msg = getNotes();
textLog(msg);

// console.log(validator.isEmail('andrew@email.com'));

variableLog('scoreCardData', process.argv);

// command line parsing
const command = process.argv[2];
const optionsInputs = process.argv.slice(3);

const options = optionsInputs.map(optionInput => {
  const data = optionInput.slice(2);
  const splitData = data.split('=');
  const optionData = { title: splitData[0], value: splitData[1] };
  return optionData;
});

console.log(optionData);

if (command === 'add') {
  console.log('Adding Note');
}
