// ran npm init -y
// express installed, express-session installed 
// passport, passport-local, mysql, mysql2, sequelize, installed 
// bcryptjs installed
// sequelize-cli installed
// 10-02-19  6:15pm


// *** Dependencies

// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// mySQLStore = require("express-mysql-session")(session),
var mySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
// Sets up the Express App
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status

// needed for HEROKU
// session and cookies
let sqlStore;
if (process.env.NODE_ENV === "production") {
  sqlStore = new mySQLStore({
    user: process.env.JAWSDB_USERNAME,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE,
    host: process.env.JAWSDB_HOST,
    port: process.env.JAWSDB_PORT
  });
  
} else {
  sqlStore = new mySQLStore({
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPWD,
    database: process.env.MYSQLDB,
    host: process.env.MYSQLHOST,
    port: process.env.JAWSDB_PORT
  });
}
let sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: sqlStore,
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/auth-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:/" + PORT + " in your browser."+ PORT);
  });
});