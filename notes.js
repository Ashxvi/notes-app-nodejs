// Created by Achraf Mahha on 17/05/2017

const fs = require('fs');

// Reusable Functions

var fetchNotes = () => {

  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }

};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));

};

var addNote = (title, body) => {

  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title); // es6 syntax
  // or var duplicateNotes = notes.filter((note) => {return note.title === title});

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }


};

var getAll = () => {

  return fetchNotes();

};

var getNote = (title) => {

  // Fetching notes
  var notes = fetchNotes();

  // Filtering notes
  var filteredNotes = notes.filter((note) => note.title === title);

  // Return the note
  return filteredNotes[0]; // filteredNotes is an array

};

var removeNote = (title) => {

  // Fetching notes
  var notes = fetchNotes();

  // Filtering notes
  var filteredNotes = notes.filter((note) => note.title !== title);

  // Saving notes
  saveNotes(filteredNotes)

  return notes.length !== filteredNotes.length

};

var logNote = (note) => {

  console.log(`Title : ${note.title}`);
  console.log(`Body : ${note.body}`);

};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
