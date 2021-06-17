const passport = require("passport");
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2").Strategy;

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
    new AzureAdOAuth2Strategy(
      {
        clientID: OUTLOOK_CLIENT_ID,
        clientSecret: OUTLOOK_CLIENT_SECRET,
        callbackURL: CLIENT_HOME_PAGE_URL+"/auth/azureadoauth2/callback",
        // callbackURL:    `${CLIENT_HOME_PAGE_URL}/auth/azureadoauth2/callback`,
        //callbackURL: "http://localhost:8080/sa/api/auth/azureadoauth2/callback",
      },
      async (accessToken, refresh_token, params, profile, done) => {
        try {
          var waadProfile = jwt.decode(params.id_token);
          //console.log(waadProfile);
  
          const user = await User.findOne({ email: waadProfile.upn });
          if (user) return done(null, user);
            
          const newUser = new User({
            outlookId: waadProfile.oid,
            name: waadProfile.name,
            email: waadProfile.upn,
            accessToken: accessToken,
            // isverified: true,
          });
          if (refresh_token) newUser.refreshToken = refresh_token;
  
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );