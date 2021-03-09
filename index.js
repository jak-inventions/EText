// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Middleware Imports
const checkAuth = require('./middleware/checkAuth.js');

// Router Imports
const uiRouter = require('./routers/ui.js');
const authRouter = require('./routers/auth.js');
const messagingRouter = require('./routers/messaging.js');

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
app.use('/api/messaging/', messagingRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', checkAuth, (req, res) => {
  res.redirect('/login');
});
