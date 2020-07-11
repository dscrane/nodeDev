// const validator = require('validator');
const { successLog, errorLog, variableLog, textLog } = require('./chalkLogs');
const getNotes = require('./notes.js');

const msg = getNotes();
textLog(msg);

// console.log(validator.isEmail('andrew@email.com'));

successLog('API Request', 'The call was successful');
errorLog('Request Failed', 'API could not be found');

variableLog('scoreCardData', ['one', 'two', 'three']);
