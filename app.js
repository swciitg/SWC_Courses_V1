//'mongodb://localhost/SWC_Media'
const express = require("express");
const app = express();
const cors = require("cors")
const dotenv = require('dotenv').config({ debug: process.env.DEBUG });
const User = require("./models/user")
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const url = process.env.url || "mongodb://localhost/SWC_Media";
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const nodemailer = require('nodemailer');
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const passportLocalMongoose = require("passport-local-mongoose");
//Requiring Routes
const streamRoutes = require("./routes/streaming.routes");
const indexRoutes = require("./routes/index.routes");
const testingRoutes = require("./routes/course.routes");
const adminRoutes = require("./routes/admin.routes");
const uploadRoute = require("./routes/upload.routes");


//mongoose setup
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});


var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //Change this later to restrict it to react app only
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, Origin, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(flash());

app.use(
  session({
    secret: "once again pkmkb & ckmkb",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection },
    ),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Setup routes
app.use("/", indexRoutes);
app.use("/courses/:id/", streamRoutes);
app.use("/", testingRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", uploadRoute);

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(
    err.status ? err : { message: "Internal server error, check server log" }
  );
  if (!err.status) {
    console.log(err);
  }
});

app.listen(PORT, function () {
  console.log("SWC Media server has started");
});
