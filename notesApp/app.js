const yargs = require('yargs');
const { addNote, removeNote, readNote, listNotes } = require('./notes.js');

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
  handler(argv) {
    addNote(argv.title, argv.message);
  },
});

//create remove command
yargs.command({
  command: 'remove',
  describe: '\x1b[36mRemove an existing note\x1b[0m',
  handler(argv) {
    removeNote(argv.title);
  },
});

yargs.command({
  command: 'read',
  describe: '\x1b[36mRead notes\x1b[0m',
  handler(argv) {
    readNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: '\x1b[36mList all notes\x1b[0m',
  handler() {
    listNotes();
  },
});

yargs.parse();
