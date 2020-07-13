const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');
const { successLog, errorLog, variableLog, textLog } = require('./chalkLogs');
const getNotes = require('./notes.js');

// customize yargs version
yargs.version('1.1.0');

/* Notes app tasks */
// add, remove, read, list

//create add command
yargs.command({
  command: 'add',
  /* command: <nameOfApp> */
  describe: '\x1b[36mAdd a new note\x1b[0m',
  /* describe: <descriptionOfCommand> */
  builder: {
    /* builder: {<allOfTheSupportedOptions>} */
    title: {
      /* <option>: <howTheOptionWorks> */
      describe: 'Note Title',
      /* describe: <descriptionOfOption */
      demandOption: true,
      type: 'string',
    },
    message: {
      describe: 'Note content',
      demandOption: true,
      type: 'string',
    },
  },
  handler: argv => {
    const { title, message } = argv;
    const note = { title, message };
    const noteJSON = JSON.stringify(note);
    console.log(noteJSON);
    const noteUnJSON = JSON.parse(noteJSON);
    console.log(noteUnJSON);
    console.log(
      `${chalk.cyan('Adding new note:')}\n ${chalk.yellow('title:')} ${
        argv.title
      }\n ${chalk.yellow('message:')} ${argv.message}`
    );
  },
});

//create remove command
yargs.command({
  command: 'remove',
  describe: '\x1b[36mRemove an existing note\x1b[0m',
  handler: () => {
    textLog('Removing a note');
  },
});

yargs.command({
  command: 'read',
  describe: '\x1b[36mRead notes\x1b[0m',
  handler: () => {
    textLog('Reading a note');
  },
});

yargs.command({
  command: 'list',
  describe: '\x1b[36mList all notes\x1b[0m',
  handler: () => {
    textLog('Listing all notes');
  },
});

yargs.parse();
