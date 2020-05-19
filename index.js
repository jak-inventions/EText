const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
// Routers
const uiRouter = require('./routers/ui.js');

app.use(express.static('public'));
app.use(uiRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(port, function(){
  console.log('Running on port ' + port);
});
