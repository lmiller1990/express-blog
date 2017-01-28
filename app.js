const express = require("express")
const bodyParser = require("body-parser")
const index   = require(__dirname + "/routes/index.js")
const users   = require(__dirname + "/routes/users.js")

const app = express()

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
