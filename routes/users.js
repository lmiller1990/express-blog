const router = require("express").Router()
var passport = require("passport");
var User = require("../models").User;

router.get("/login", function(req, res) {
  res.render("login");
})

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}))

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
    where: { username: username }
  }).then((user) => {
    if (user) { 
      req.flash("error", "Username already exists.")
      return res.redirect("/signup")
    } else {
      User.create({
        username: username,
        password: password
      }).then((user) => {
        req.flash("info", user.username, ' was created.')
        return res.redirect("/")
      })
    }
  })
})

module.exports = router
