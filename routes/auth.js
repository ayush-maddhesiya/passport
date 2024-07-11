var express = require('express');
var mongoose = require('mongoose')
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../model/user.model.js')
var router = express.Router();
// const bcrypt = require('bcryptjs');  

passport.use(new LocalStrategy({
  username: 'username', 
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ username:email }); // Find user by email
    console.log(user,"here");
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    // Validate password using bcrypt
    
    if (password === user.password) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user); 
  } catch (err) {
    return done(err);
  }
}));

router.get('/login', function(req, res, next) {
  res.render('login');
});
passport.serializeUser((user, done) => {
  done(null, user.id); 
});
  
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router;