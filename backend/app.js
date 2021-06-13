const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

const helmet = require("helmet");
const url = "mongodb://localhost/HAB_DB";
//const url = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err.message);
    else console.log("Successfully connected to DB!");
  }
);

//routes
app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );

app.use(methodOverride("_method"));
app.use(mongoSanitize());

app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
