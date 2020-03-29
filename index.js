const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.set('views', __dirname + '/views')

app.listen(port, function(){
  console.log('Running on port ' + port);
});

app.get('/', function(req, res){
  res.render('index.pug');
});
