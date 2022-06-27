const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if (!foundNote) {
        console.log(chalk.red.inverse('Error, note not found!'));
        return;
    }

    console.log(chalk.green.bold(foundNote.title));
    console.log(foundNote.body);
};

const addNote = (title, body) => {
    const notes = loadNotes();

    if (notes.find((note) => note.title === title)) {
        console.log(chalk.red.inverse('Note title taken!'));
        return;
    } 

    notes.push({
        title: title, 
        body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note saved!'));
};

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);

    if (filteredNotes.length >= notes.length) {
        console.log(chalk.bgRed('No note found!'));
        return;
    }

    saveNotes(filteredNotes);
    console.log(chalk.bgGreen('Note removed!'));
};

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes'));
    loadNotes().forEach((note) => {
        console.log(note.title);
    });
} 

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};
 
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
