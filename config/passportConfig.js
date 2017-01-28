const passport      = require("passport")
const User          = require("../models").User
const models        = require('../models')
const LocalStrategy = require("passport-local").Strategy

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findAll({
      where: {
        id: id
      }
    }).then((user) => { done(err, user) })
  })

  passport.use("login", new LocalStrategy((username, password, done) => {
    this.models = models
    // check if username exists, if not, tell user
    // else check password, if invalid tell user
    // else authenticate
  }))
}

