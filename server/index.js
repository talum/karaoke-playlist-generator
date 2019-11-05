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

app.get('/api/songs', (req, res) => {
  BillboardClient.getSongs().then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ songs: response}));
  });
});

app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
});
