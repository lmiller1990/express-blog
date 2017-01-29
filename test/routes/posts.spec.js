const request    = require("supertest")
const agent      = require("superagent")
const Bluebird   = require("bluebird")
const app        = require("../../app")
const expect     = require("chai").expect
const models     = require("../../models")

describe("/posts", () => {
  before(() => {
    require("../../models").sequelize.sync()
  })

  beforeEach(() => {
    this.models = models
    return Bluebird.all([
      this.models.Post.destroy({
        truncate: true
      })
    ])
  })

  it("/create persists a new post if authenticated", (done) => {
    const self = this
    request(app)
      .post("/posts/create")
      .type("form")
      .query(token)
      .set("Accept", /application\/json/)
      .send({
        title: "title",
        body: "body"
      })
      .end((err, res) => {
        self.models.Post.findAll()
          .then((posts) => {
            console.log('post!!!', posts)
            expect(posts.length).to.equal(1)
            expect(posts[0].title).to.equal("title")
            done()
          })
      })
  })
})
