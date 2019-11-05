const express = require('express');
const bodyParser = require('body-parser');
const BillboardClient = require('./BillboardClient.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/songs/:year', (req, res) => {
  const { year } = req.params

  BillboardClient.getSongsAroundYear(year).then((response) => {
    const songs = response.reduce((acc, val) => acc.concat(val.slice(0, 10)), []);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ songs: songs}));
  });
});

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
});
