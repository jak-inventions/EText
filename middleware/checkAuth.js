const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Checks to see if a user is logged in, and redirects accordingly
const checkAuth = (req, res, next) => {
  const token = req.cookies['auth-token'];
  if(!token) return res.redirect('/login');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    res.redirect('/messaging');
  }
  catch (e) {
    next();
  }
}

module.exports = checkAuth;
