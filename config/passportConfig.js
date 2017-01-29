const passport      = require("passport")
const User          = require("../models").User
const models        = require('../models')
const LocalStrategy = require("passport-local").Strategy

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id: id
      }
    }).then((user) => { 
      console.log(user, 'was deserialized')
      done(null, user) })
  })

  passport.use("login", new LocalStrategy((username, password, done) => {
    this.models = models
    this.models.User.findOne({
      where: {
        username: username
      }        
    }).then((user) => {
      if (!user) {
        return done(null, false, "Username not found.")
      }
      user.checkPassword(password).then((res) => {
        if (res) {
          return done(null, user) // authenticated
        } else {
          return done(null, false, "Incorrect password.")
        }
      })
    })
      .catch((err) => { 
        console.log("Error occurred.", err)
        return done(null, false) 
      })
  }))
}

