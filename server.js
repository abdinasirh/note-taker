const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const path = require('path');
const fs = require('fs');
const { dirname } = require('path/posix');


// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get("/notes", function (req, res){
    res.sendFile(path.join(_dirname, './public/notes.html'))
});


app.get('*', function (req, res){
    res.sendFile(path.join(_dirname, './public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/api/notes', function(req, res){
      fs.readFile(_dirname '/db/db.json', 'utf8')
  })


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
