//'mongodb://localhost/SWC_Media'
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const url = "mongodb://localhost/SWC_Media";
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

//Requiring Routes
const streamRoutes = require("./routes/streaming.routes");
const authRoutes = require("./routes/auth2.routes");
const testingRoutes = require("./routes/course.routes");
const adminRoutes = require("./routes/admin.routes");
//const uploadRoute = require('./routes/upload.routes');

//mongoose setup
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
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
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(flash());

//Setup routes
app.use("/api/", authRoutes);
app.use("/api/courses/:id/", streamRoutes);
app.use("/api/", testingRoutes);
app.use("/api/admin", adminRoutes);

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
  console.log(`SWC Media server has started at port ${PORT}`);
});
