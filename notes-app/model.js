const fs = require('fs')

const book = {
    title: "Alter Ego is awesome",
    author: "Ryan"
}

// const bookJSON = JSON.stringify(book)
// console.log(bookJSON)

// const parsedData = JSON.parse(bookJSON)
// console.log(parsedData.author)

// fs.writeFileSync("data.json", bookJSON)

const dataBuffer = fs.readFileSync('data.json')
const data = JSON.parse(dataBuffer.toString())
data.name = "Villain"
const newJSON = JSON.stringify(data)
fs.writeFileSync('data.json', newJSON)