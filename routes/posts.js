const router = require("express").Router()
const passport = require("passport")
const Post = require("../models").Post
const authenticate = require("./routeHelpers.js")

router.get("/new", authenticate, (req, res) => {
  res.render("posts/new")
})

router.get("/", (req, res) => {
  Post.findAll().then((posts) => {
    posts.forEach((post) => {
      console.log(post.body)
      let firstLine = post.body.split(".")[0] + "."
      if (firstLine) post.preview = firstLine
    })
    res.locals.posts = posts
    res.render("posts/index")
  })
})

router.post("/update", authenticate, (req, res) => {
  const postId = parseInt(req.body.id)
  Post.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {
      id: postId 
    }
  }).then((post) => {
    req.flash("info", "Post updated.")
    return res.redirect(`/posts/${postId}`)
  })
})

router.get("/edit/:id", authenticate, (req, res) => {
  Post.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  }).then((post) => {
    res.locals.post = post
    res.render("posts/edit")
  })
})

router.post("/create", authenticate, (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body
  }).then((post) => {
    req.flash("info", `${req.body.title} was created.`)
    return res.redirect(`/posts/${post.id}`)
  })
})

router.get("/:id", (req, res) => {
  console.log(req.params.id)
  Post.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  }).then((post) => {
    res.locals.post = post
    return res.render("posts/show")
  })
})

module.exports = router
