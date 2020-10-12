
var OutlookStrategy = require('passport-outlook');
const express = require("express");
const User = require("../models/user");
const OUTLOOK_CLIENT_ID ='179375d7-cc2d-4827-81c2-a2b2014a037c';
const OUTLOOK_CLIENT_SECRET ='Y3U-HVGyWt05pjjLPh4F..YPn62.Kz~PyL';


passport.use(new OutlookStrategy({
    clientID: OUTLOOK_CLIENT_ID,
    clientSecret: OUTLOOK_CLIENT_SECRET,
    callbackURL: 'https://www.localhost.com/auth/outlook/callback',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    var user = {
      outlookId: profile.id,
      name: profile.DisplayName,
      email: profile.EmailAddress,
      accessToken:  accessToken
    };
    if (refreshToken)
      user.refreshToken = refreshToken;
    if (profile.MailboxGuid)
      user.mailboxGuid = profile.MailboxGuid;
    if (profile.Alias)
      user.alias = profile.Alias;
    User.findOrCreate(user, function (err, user) {
      return done(err, user);
    });
  }
));
