const router = require("express").Router()

router.get("/tetris", (req, res) => {
  res.render("projects/tetris")
})

module.exports = router
