const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    signedIn: false
  });
});

router.get('/messaging', function(req, res){
  res.send('messaging');
});

router.get('/platforms', function(req, res){
  res.render('platforms');
});

router.get('/signIn', function(req, res){
  res.render('signIn');
});

module.exports = router;
