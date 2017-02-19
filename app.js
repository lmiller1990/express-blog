#!/usr/bin/env node
var bodyParser   = require("body-parser");
var cookieParser = require("cookie-parser");
const moment     = require("moment")
var express      = require("express");
var flash        = require("connect-flash");
var passport     = require("passport");
var path         = require("path");
var session      = require("express-session");

var setUpPassport = require("./config/passportConfig.js");
var routes = require("./routes/main.js");

var app = express();

app.locals.moment = moment

setUpPassport();

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false  }));
app.use(cookieParser());

app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});

module.exports = app
