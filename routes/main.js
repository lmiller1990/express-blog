var express = require("express");
var passport = require("passport");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
  }
}

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.use("/", require("./users.js"))
router.use("/posts", require("./posts.js"))
router.use("/projects", require("./projects.js"))

router.get("/", function(req, res, next) {
  if (res.locals.currentUser) {
    console.log("Logged in as", res.locals.currentUser.username)
  }
  return res.redirect("/posts")
});

router.get("/about", (req, res) => {
  return res.render("about") 
})

router.get("/resume", (req, res) => {
  return res.render("resume") 
})

router.get("/projects", (req, res) => {
  // return res.render("projects")
  return res.render("projects/index")
})

module.exports = router;
