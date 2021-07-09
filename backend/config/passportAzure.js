const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const Prof = require("../models/Prof");
const TA = require("../models/TA");
const User = require("../models/user");
const { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, CLIENT_HOME_PAGE_URL } = process.env;
const jwt = require("jsonwebtoken");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(
  new MicrosoftStrategy(
    {
      clientID: OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
      callbackURL: CLIENT_HOME_PAGE_URL + "/auth/azureadoauth2/callback",
      // callbackURL:    `${CLIENT_HOME_PAGE_URL}/auth/azureadoauth2/callback`,
      //callbackURL: "http://localhost:8080/sa/api/auth/azureadoauth2/callback",
      scope : ['user.read','team.readbasic.all','files.read.all', 'mail.read']
    },
    async (accessToken, refresh_token, params, profile, done) => {
      try {
        const userProfile = profile._json
        //console.log(waadProfile);

        const user = await User.findOne({ email: userProfile.mail });
        if (user) return done(null, user);

        const newUser = new User({
          outlookId: userProfile.id,
          name: userProfile.givenName,
          email: userProfile.mail,
          accessToken: accessToken,
          // isverified: true,
        });
        if (refresh_token){
          console.log("refresh token")
          console.log(refresh_token)
          newUser.refreshToken = refresh_token;
        }
        /* if (user == Prof.find({ email: userProfile.mail })) {
          let data = { role: "Prof" };
          User.findByIdAndUpdate(params.id, data);
          Prof.user = user[0].id;

        } else if (user == TA.find({ email: userProfile.mail})) {
          let data = { role: "TA" };
          User.findByIdAndUpdate(params.id, data);
          TA.user = user[0].id;
        } */
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);

