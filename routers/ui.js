const express = require('express');
const app = express();
const verify = require('./verifyToken.js');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth.js');
const User = require('../models/User.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser());

router.get('/messaging', verify, (req, res) => {
  res.render('messaging');
});

router.get('/login', (req, res) => {
  //Check to see if user is already signed in
  let token = req.cookies['auth-token'];
  if(token && jwt.verify(token, process.env.TOKEN_SECRET)){
    return res.redirect('/messaging');
  }
  return res.render('login');
});

router.get('/register', (req, res) => {
  //Check to see if user is already signed in
  return res.render('register');
});

router.get('/forgotPassword', (req, res) => {
  return res.render('forgotPassword');
});

router.get('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res
        .cookie('message', JSON.stringify({
          text: 'Password reset token is invalid or has expired.',
          color: 'red'
        }))
        .redirect('/');
    }
    res.render('reset', {token: req.params.token});
  });
});

module.exports = router;
