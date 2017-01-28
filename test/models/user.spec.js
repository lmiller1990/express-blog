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

  it("compares a guess and password and responds with the corrert result", (done) => {
    let password = "the_password"
    let incorrectGuess = "wrong_password"

    this.models.User.create({
      username: "tester",
      password: password
    }).then((user) => {
      user.checkPassword(incorrectGuess).then((result) => {
        expect(result).to.equal(false)
      })
      user.checkPassword(password).then((result) => {
        expect(result).to.equal(true)
        done()
      })
    })
  })  
})
