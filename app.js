// Created by Achraf Mahha on 17/05/2017

const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

// Argument options for Yargs
const titleOptions = {
  describe: 'Title of note',
  demand: true, // Required argument
  alias: 't'
}

const bodyOptions = {
  describe: 'Body of note',
  demand: true, // Required argument
  alias: 'b'
}

const argv = yargs
  .command(
    'add', 'Add a note', {
      title: titleOptions,
      body: bodyOptions
    }
  )
  .command('list', 'Listing all notes')
  .command(
    'read', 'Read a note', {
      title: titleOptions
    }
  )
  .command(
    'remove', 'Remove a note', {
      title: titleOptions
    }
  )
  .help()
  .argv;

var command = process.argv[2]; // or var command = argv._[0];

//console.log('Command : ', command)
//console.log('Yargs : ', argv)

switch (command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if (_.isUndefined(note)) {
      console.log('Note already exists.');
    } else {
      console.log('Note added successfully.');
      console.log('------------------------');
      notes.logNote(note);

    }
    break;
  case 'list':
    var allNotes = notes.getAll();
    var numberOfNotes = allNotes.length;
    if (numberOfNotes === 0) {
      console.log(`You have not created any note yet.`)

    } else {
      console.log(`Printing ${allNotes.length} note(s).`)
      allNotes.forEach((note) => {
          console.log('------------------------');
          notes.logNote(note);
        }

      );
    }

    break;
  case 'read':
    var note = notes.getNote(argv.title);

    if (!note) {
      console.log('Note not found.');
    } else {
      notes.logNote(note);
    }

    break;
  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was successfully removed.' : 'Note not found.';
    console.log(message);

    break;
  default:
    console.log('Command not recognized')
    break;

}
