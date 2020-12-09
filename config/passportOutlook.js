const passport = require("passport");
const OutlookStrategy = require("passport-outlook").Strategy;
const express = require("express");
const User = require("../models/user");
const config = require("config");
const OUTLOOK_CLIENT_ID = config.get("OUTLOOK_CLIENT_ID");
const OUTLOOK_CLIENT_SECRET = config.get("OUTLOOK_CLIENT_SECRET");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new OutlookStrategy(
    {
      clientID: OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/outlook/callback",
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      // console.log("Outlook profile data..", profile);

      // check if user exists
      User.findOne({ outlookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // user already exists
          return done(null, currentUser);
        } else {
          // create new user
          var user = {
            outlookId: profile.id,
            name: profile._json.DisplayName,
            email: profile._json.EmailAddress,
            accessToken: accessToken,
            isverified: true,
          };

          if (refreshToken) user.refreshToken = refreshToken;
          if (profile.MailboxGuid) user.mailboxGuid = profile.MailboxGuid;
          if (profile.Alias) user.alias = profile.Alias;
          new User(user).save().then((newUser) => {
            return done(null, newUser);
          });
        }
      });
    }
  )
);
