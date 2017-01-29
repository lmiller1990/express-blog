const request  = require("supertest")
const Bluebird = require("bluebird")
const app      = require("../../app")
const expect   = require("chai").expect
const cheerio  = require("cheerio")
const models   = require("../../models")

describe("/users",() => {
  before(() => {
    require("../../models").sequelize.sync()
  })

  beforeEach(() => {
    this.models = models

    return Bluebird.all([
      this.models.User.destroy({
        truncate: true
      })
    ])
  })

  it("should be able to log in", (done) => {
    models.User.create({ username: "test", password: "test" }).then(() => {
      request(app)
        .post("/login")
        .type("form")
        .set("Accept", /application\/json/)
        .send({ username: "test", password: "test" })
        .expect((res) => {
          console.log("EXPECT")
          let htmlResponse = res.text
          console.log(htmlResponse)
        }).end(done)
    })
  })

  it("/create persists a new user", (done) => {
    const self = this
    request(app)
      .post("/signup")    
      .type("form")
      .set("Accept", /application\/json/)
      .send({
        username: "New User",
        password: "password123"
      })
      .end((err, res) => {
        self.models.User.findAll()
          .then((users) => {
            expect(users.length).to.equal(1)
            expect(users[0].username).to.equal("New User")
            done()
          })
      })
  })
})
