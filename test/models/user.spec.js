const Bluebird = require("bluebird")
const expect   = require("chai").expect
const models   = require("../../models")

describe("User", () => {
  before(() => {
    return require("../../models").sequelize.sync()
  })

  beforeEach(() => {
    this.models = models
    return Bluebird.all([
      this.models.User.destroy({
        truncate: true
      })
    ])
  })

  it ("prints the username", (done) => {
    this.models.User.create({
      username: "Test user"
    }).then((user) => {
      let name = user.sayHi()
      expect(name).to.equal(user.username)
      done()
    })
  })

  it("hashes the password before persisting the user", (done) => {
    this.models.User.create({
      username: "test_user",
      password: "non_hashed_password"
    }).then((user) => {
      expect(user.password).not.to.equal("non_hashed_password")
      done()
    })
  })
  
})
