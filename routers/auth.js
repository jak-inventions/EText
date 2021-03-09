const router = require('express').Router();
const app = require('express')();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const async = require('async');
var crypto = require("crypto");
const User = require('../models/User');
const verify = require('./verifyToken');
const {registerValidation, loginValidation} = require('../validation.js');

app.use(cookieParser());

// Register
router.post('/register', async (req, res) => {
  if(req.body.password == req.body.confirm){
    // Validates the data before creating a user
    delete req.body.confirm;
    const {error} = registerValidation(req.body);
    if(error){
      return res
        .status(400)
        .cookie('alert', JSON.stringify({
          text: 'Error: ' + error.details[0].message,
          color: 'red'
        }))
        .redirect('/register');
    }
  }
  else{
    return res
      .cookie('alert', JSON.stringify({
        text: "Passwords don't match",
        color: 'red'
      }))
      .redirect('/register');
  }

  // Checking if user is already in the database
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists){
    return res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Email already has an account',
        color: 'red'
      }))
      .redirect('/register');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creates a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword
  });
  try{
    const savedUser = await user.save();
    //res.send({user: user.id});
    res
      .cookie('alert', JSON.stringify({
        text: 'Account created',
        color: 'green'
      }))
      .redirect('/login');
  }
  catch(err){
    res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Error: ' + err,
        color: 'red'
      }))
      .redirect('/');
  }

});

// Login
router.post('/login', async (req, res) => {
  // Validates the data before logging in a user
  const {error} = loginValidation(req.body);
  if(error){
    return res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Error: ' + error.details[0].message,
        color: 'red'
      }))
      .redirect('/login');
  }

  // Checking if user is already in the database
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Email not found',
        color: 'red'
      }))
      .redirect('/login');
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass){
    return res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Invalid password',
        color: 'red'
      }))
      .redirect('/login');
  }

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  return res
    .cookie('auth-token', token)
    .redirect('/messaging');
  //res.header('auth-token', token).send(token);
});

// Logout
router.post('/logout', (req, res) => {
  return res
    .cookie('auth-token', '')
    .cookie('alert', JSON.stringify({
      text: 'Successfully logged out',
      color: 'green'
    }))
    .redirect('/login');
});

router.post('/delete', verify, async (req, res) => {
  const token = req.cookies['auth-token'];
  try{
    // Checking if user is already in the database
    const user = await User.deleteOne({_id: req.user._id});
    if(!user){
      return res
        .status(400)
        .cookie('alert', JSON.stringify({
          text: "User doesn't exits",
          color: 'red'
        }))
        .redirect('/');
    }
    return res
      .cookie('auth-token', '')
      .cookie('alert', JSON.stringify({
        text: 'User deleted',
        color: 'green'
      }))
      .redirect('/');
  }
  catch(err){
    return res
      .status(400)
      .cookie('alert', JSON.stringify({
        text: 'Error: ' + err,
        color: 'red'
      }))
      .redirect('/');
  }
});

// Sends Password Reset Email
router.post('/forgotPassword', (req, res) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res
            .status(400)
            .cookie('alert', JSON.stringify({
              text: 'No account with that email address exists.',
              color: 'red'
            }))
            .redirect('/forgotPassword');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'noreply.protosapps@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply.protosapps@gmail.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'https://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err){
      return res
        .cookie('alert', JSON.stringify({
          text: 'Error: ' + err,
          color: 'red'
        }))
        .redirect('/');
    }
    return res
      .cookie('alert', JSON.stringify({
        text: 'Password reset email sent',
        color: 'green'
      }))
      .redirect('/');
  });
});


router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async function(err, user) {
        if (!user) {
          return res
            .cookie('alert', JSON.stringify({
              text: 'Password reset token is invalid or has expired.',
              color: 'red'
            }))
            .redirect('/');
        }
        if(req.body.password === req.body.confirm) {
          // Hash the new password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
            done(err, user);
          });
        }
        else {
            return res
              .cookie('alert', JSON.stringify({
                text: 'Passwords do not match.',
                color: 'red'
              }))
              .redirect('/reset/' + req.params['token']);
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'noreply.protosapps@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply.protosapps@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err);
      });
    }
  ], function(err) {
    res
      .cookie('alert', JSON.stringify({
        text: 'Your password has been changed',
        color: 'greem'
      }))
      .redirect('/');
  });
});

module.exports = router;
