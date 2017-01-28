const express = require("express")
const bodyParser = require("body-parser")
const session       = require("express-session")
const flash         = require("connect-flash")
const passport      = require("passport")
const cookieParser  = require("cookie-parser")
const index   = require(__dirname + "/routes/index.js")
const users   = require(__dirname + "/routes/users.js")
const setupPassport = require(__dirname + "/config/passportConfig.js")

const app = express()
setupPassport()

app.use(cookieParser())
app.use(session({
  secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: true
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true  }))

app.use("/", index)
app.use("/users", users)

app.use((req, res) => {
  res.status(404).send("404 error. Page not found") 
})

app.listen(3000, () => {
  console.log("App started on port 3000.")
})

module.exports = app
