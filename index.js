const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(port, function(){
  console.log('Running on port ' + port);
});

app.get('/', function(req, res){
  res.render('index', {
    signedIn: false
  });
});

app.get('/messaging', function(req, res){
  res.send('Messaging');
});

app.get('/platforms', function(req, res){
  res.render('Platforms');
});

app.get('/signIn', function(req, res){
  res.render('signIn');
});
