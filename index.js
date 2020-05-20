// Imports
const express = require('express');
const bodyParser = require('body-parser');

// Router Imports
const uiRouter = require('./routers/ui.js');
const authRouter = require('./routers/auth.js');

//Constants
const app = express();
const port = process.env.PORT || 8000;

// Settings
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.static('public'));

// Routers
app.use(uiRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('EText');
});
