const models     = require("../models")
const express    = require("express")
const passport   = require("passport")
const router     = express.Router()
 
router.use((req, res, next) => {
  console.log(res.locals)
  res.locals.currentUser = req.user
  res.locals.errors = req.flash("error")
  res.locals.info = req.flash("info")
  next()
})

router.post("/create", (req, res) => {
  models.User.create({
    username: req.body.username,
    password: req.body.password
  }).then((user) => {
    res.status(201).json()
  })
})

router.get("/signin", (req, res) => {
  console.log(res.locals.currentUser)
  res.render("login")
})

router.post("/signin", passport.authenticate("login", {
  successRedirect: "/signin",
  failureRedirect: "/signin",
  failureFlash: "true"
}))

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})
module.exports = router
