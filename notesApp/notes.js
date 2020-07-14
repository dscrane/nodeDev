const fs = require('fs');
const {
  successLog,
  errorLog,
  commandLog,
  variableLog,
} = require('./chalkLogs');

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    const notesJSON = notesBuffer.toString();
    return JSON.parse(notesJSON);
  } catch (err) {
    return [];
  }
};

saveNotes = notes => {
  // try {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
  successLog('Success', 'Note added successfully');
  /* } catch (err) {
    errorLog('File System', 'There was an issue adding the new note');
  } */
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    commandLog('add', title, body);
    notes.push({ title: title, body: body });
    saveNotes(notes);
  } else {
    errorLog('Notes', 'Notes cannot have duplicate titles');
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);

  if (notesToKeep.length === notes.length) {
    errorLog('Notes', 'There is no note with this title');
  } else {
    commandLog('remove', title);
    saveNotes(notesToKeep);
    variableLog('Notes', 'Note removed successfully');
  }
};

const readNote = title => {
  const notes = loadNotes();

  const matchingNote = notes.find(note => note.title === title);

  matchingNote
    ? commandLog('read', matchingNote.title, matchingNote.body)
    : errorLog('Notes', 'There is no note matching this title');
};

const listNotes = () => {
  const notes = loadNotes();
  commandLog('All Notes:');
  notes.forEach(note => {
    commandLog('list', note.title, note.body);
  });
};

module.exports = { addNote, removeNote, readNote, listNotes };
