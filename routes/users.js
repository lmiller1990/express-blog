const models    = require("../models")
const router    = require("express").Router()

router.post("/create", (req, res) => {
  models.User.create({
    username: req.body.username,
    password: req.body.password
  }).then((user) => {
    res.status(201).json()
  })
})

module.exports = router
