const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const morgan = require('morgan');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index.router');
const mainRouter = require('./routes/mainRouter');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extendet: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'my fridge',
  resave: false,
  store: new FileStore(),
  saveUninitialized: false,
  name: 'fridge',
  cookie: { httpOnly: true },
}));

app.use('/', indexRouter);
app.use('/', mainRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`This port ${PORT}`));
