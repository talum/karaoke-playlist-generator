const express = require('express');
const bodyParser = require('body-parser');
const SongGenerator = require('./SongGenerator.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/songs/:year', (req, res) => {
  const { year } = req.params

  SongGenerator.call(year)
    .then((response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ songs: response}));
    })
    .catch((err) => {
      res.status(422).send('try again');
    });
});

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
});
