const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer')
require("dotenv").config();
const methodOverride = require("method-override");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const helmet = require("helmet");
const MONGO_URL = "mongodb://localhost/SAC_DB";
// const MONGO_URL = "mongodb://mongo:27017/SAC_DB";
//const url = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 8080;
require("./config/passportAzure");

//required routes
const authRoutes = require("./routes/auth.routes");

const coursesroutes = require('./routes/courses.routes')
const graphroutes = require('./routes/graph.routes')

const ProfRoutes = require("./routes/Prof-TA.routes");
const userroutes = require("./routes/user.routes");

const videoRoutes = require("./routes/video.routes");


const db = mongoose.connect(
  MONGO_URL,
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

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

mongoose.set("useCreateIndex", true);

/////////socket.io start
var username;
const http = require('http');
const socker = require('./socker/socker.js');
const server = http.createServer(app);
socker(server);

///socket.io ENDs

app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/assets/"));

app.use(methodOverride("_method"));
app.use(mongoSanitize());

//session middleware


app.use(
  cookieSession({
    name: "swc-courses-session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["lorem ipsum"],
    httpOnly: false,
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use('/courses/api/GD',(req, res, next) => {
//   if(req.user){
//   res.locals.username = req.user.name;
//   // console.log(req.user.name);
//   app.locals.username=req.user.name;
//   username=app.locals.username;
//   }
//   // res.locals.session = req.session;
//   next();
// });

app.use("/courses/api/courses", coursesroutes)
app.use("/courses/api/graph", graphroutes)
app.use("/courses/api", authRoutes);

app.use("/courses/api/teacher", ProfRoutes);
app.use("/courses/api/user", userroutes);
app.use("/courses/api/video", videoRoutes);


app.use(helmet({ contentSecurityPolicy: false }));


app.get("/", (req, res) => {
  res.send("Server on")
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
