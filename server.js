
//dependencies
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

//data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

//get api's 
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


// api to post notes
app.post("/api/notes", (req, res) => {
  //read from db.json
  var notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  var addNote = req.body;
  var noteId = (notesDB.length).toString();

  
  addNote.id = noteId;
  //push notes to db
  notesDB.push(addNote);

  //write notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
})


//api to delete notes by id
app.delete("/api/notes/:id", (req, res) => {
  var notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  var id = (req.params.id).toString();

  //filter and delete 
  //got  a little help from stackoverflow "https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array"
  notesDB = notesDB.filter(note =>{
      return note.id != id;
  })

  //write notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
});






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
