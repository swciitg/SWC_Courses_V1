const express = require("express");
const mongoose = require("mongoose");
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
const MONGO_URL = "mongodb://localhost/HAB_DB";
//const url = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 8080;
require("./config/passportAzure");

//required routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/Prof-TA.routes");
const TA = require("./models/TA");


const db=mongoose.connect(
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

// cross origin Resourse sharing (CORS)
var corsOptions = {
  // origin: BASECLIENT,
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
mongoose.set("useCreateIndex",true);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Change this later to restrict it to react app only
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

app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "./uploads"));

app.use(methodOverride("_method"));
app.use(mongoSanitize());

//session middleware

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

app.use("/courses/api", authRoutes);
app.use("/courses/api/users", userRoutes);

app.get("/newta",(req,res)=>{
  const ta = new TA({
    email:"komals"
  });
  ta.save()
    .then((result)=>{
      res.send(result);
    })
    .catch((error)=>{
      console.log(error);
    })
})

app.use(helmet({ contentSecurityPolicy: false }));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
