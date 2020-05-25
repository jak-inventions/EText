const express = require('express');
const verify = require('./verifyToken.js');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth.js');
const User = require('../models/User.js');

router.get('/messaging', verify, (req, res) => {
  res.render('messaging');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/forgotPassword', (req, res) => {
  // ToDo
  res.render('forgotPassword');
});

router.get('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log('Password reset token is invalid or has expired.');
      return res.redirect('/');
    }
    res.render('reset', {token: req.params.token});
  });
});

module.exports = router;
