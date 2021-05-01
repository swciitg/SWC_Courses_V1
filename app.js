const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//const PORT = process.env.PORT || 5000;
const PORT = 5000;

process.env.BASE_DOM =
  process.env.NODE_ENV === "production"
    ? `https://swc2.iitg.ac.in`
    : `http://localhost:${PORT}`;

process.env.BASE_DOM_CLIENT =
  process.env.NODE_ENV === "production"
    ? `https://swc2.iitg.ac.in`
    : `http://localhost:3000`;

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const url =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URL
    : process.env.url;

//const url = config.get("MONGO_URL");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./config/passportOutlook");

//Requiring Routes
const streamRoutes = require("./routes/streaming.routes");
const authRoutes = require("./routes/auth.routes");
const testingRoutes = require("./routes/course.routes");
const adminRoutes = require("./routes/admin.routes");
//const uploadRoute = require('./routes/upload.routes');

/**
 * base url
 */
//if you want different base url in dev and production then use this line of code

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : process.env.BASE_URL;

//mongoose setup
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.error("DB connection fail"));

var corsOptions = {
  origin: process.env.BASE_DOM,
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.BASE_DOM); //Change this later to restrict it to react app only
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token, Origin, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/courses", express.static(__dirname + "/assets"));

// SESSION MIDDLEWARE
app.use(
  cookieSession({
    name: "swc-courses-session",
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: false, //////////// CHANGE IT AFTERWARDS !!!
    // path: "http://localhost:3000/",
    keys: ["hello world"],
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Setup routes
// app.use("/api/", authRoutes); //// changed it temporarily to test outlookOauth
app.use(`${baseUrl}/`, authRoutes);
app.use(`${baseUrl}/api/courses/:id/`, streamRoutes);
app.use(`${baseUrl}/api/`, testingRoutes);
app.use(`${baseUrl}/api/admin`, adminRoutes);

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

///// CHANGE THIS BEFORE DEPLOYMENT
// app.get("*", function (req, res) {
//   res.send("PAGE NOT FOUND 404");
// });

//Setup routes
// Serve static assets if in production
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  //set static folder
  console.log("i'm running");
  app.use(express.static("client/build"));

  app.get("/courses/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

console.log(process.env);

app.listen(PORT, function () {
  console.log(`SWC Media server has started at port ${PORT}`);
});
