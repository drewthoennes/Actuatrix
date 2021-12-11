require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const { Server } = require('http');
const path = require('path');

const app = express();
const server = Server(app);
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle errors
app.use((err, _req, res, next) => {
  if (err instanceof SyntaxError) {
    res.json({ error: 'Invalid JSON' });
  } else {
    next();
  }
});

// CORS
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/index.html', (req, res) => res.redirect('/'));
app.use('/public', express.static(path.join(__dirname, '/dist')));
app.use('/*', express.static(path.join(__dirname, '/dist')));

server.listen(PORT);

console.log(chalk.green(`Started on port ${PORT}`));
