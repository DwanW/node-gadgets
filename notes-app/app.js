// const fs = require('fs')
// fs.writeFileSync('notes.txt', 'Written with Node.js');
// fs.appendFileSync('note.txt', 'Challenge Accepted');
const validator = require('validator');
const chalk = require('chalk')
const getNotes = require("./notes.js")

console.log(chalk.green(getNotes()))

console.log(validator.isEmail("asdqw@yahoo.com"))
console.log(validator.isURL("https://www.google.com"))