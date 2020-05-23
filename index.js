// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Router Imports
const uiRouter = require('./routers/ui.js');
const authRouter = require('./routers/auth.js');

// Constants
const app = express();
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/etext';

// Settings
app.set('view engine', 'pug');
app.set('views', './views');
dotenv.config();
mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Routers
app.use(uiRouter);
app.use('/api/user/', authRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (req, res) => {
  const token = req.cookies['auth-token'];
  if(!token) return res.redirect('/login');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    res.redirect('/messaging');
  }
  catch (e) {
    res.redirect('/login');
  }
});
