const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => (
    "Your Notes ..."
)

const addNote = (title, body) => {
    const notes = loadNotes();

    const hasDuplicate = notes.find((note) => note.title === title);

    if (!hasDuplicate) {
        notes.push({
            title,
            body
        })

        saveNotes(notes)
        console.log('new note added')
    } else {
        console.log('note title taken')
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes)
    if(notes.length === newNotes.length){
        console.log(chalk.red.inverse("No note removed"))
    } else {
        console.log(chalk.green.inverse(title + " successfully removed"))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellowBright.inverse("your notes"))
    notes.forEach((note)=> {
        console.log(chalk.green.inverse(note.title))
        console.log(chalk.white.inverse(note.body))
    
    })
}

const readNote = (title) => {
    const notes = loadNotes();

    const targetNote = notes.find((note) => note.title === title);
    
    if(targetNote){
        console.log(chalk.green.inverse(targetNote.title))
        console.log(chalk.white.inverse(targetNote.body))
    } else {
        console.log(chalk.red.inverse("Note does not exist"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const data = JSON.parse(fs.readFileSync('notes.json').toString());
        return data;
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}