// const fs = require('fs')
// fs.writeFileSync('notes.txt', 'Written with Node.js');
// fs.appendFileSync('note.txt', 'Challenge Accepted');
const validator = require('validator');
const chalk = require('chalk')
const yargs = require('yargs')
const { getNotes, addNote, removeNote, listNotes, readNote } = require("./notes.js")

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { addNote(argv.title, argv.body) }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { removeNote(argv.title) }
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})
// console.log(process.argv)
// console.log(yargs.argv)

yargs.parse();

// console.log(chalk.green(getNotes()))

// console.log(validator.isEmail("asdqw@yahoo.com"))
// console.log(validator.isURL("https://www.google.com"))
// console.log(process.argv)