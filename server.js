const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
// const { dirname } = require('path/posix');
// const notesdb = require('./db/db.json');
const uuid = require('./helpers/uuid');


// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });



app.post("/api/notes", (req, res) => {
  let notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let addNewNote = req.body;
  let noteId = (notesDB.length).toString();

  //create new property called id based on length and assign it to each json object
  addNewNote.id = noteId;
  //push updated note to the data containing notes history in db.json
  notesDB.push(addNewNote);

  //write the updated data to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
})

app.delete("/api/notes/:id", (req, res) => {
  let notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let id = (req.params.id).toString();

  //filter all notes that does not have matching id and saved them as a new array
  //the matching array will be deleted
  notesDB = notesDB.filter(selected =>{
      return selected.id != id;
  })

  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
});






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
