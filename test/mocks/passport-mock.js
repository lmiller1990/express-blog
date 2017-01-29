const passport      = require("passport")
const LocalStrategy = require("passport-local").Strategy
const express       = require("express")

const app = express()

passport.use("login", new LocalStrategy((username, password, done) => {
  return done(null, { username: "Mock user", id: 1 }) // authenticated
}))
