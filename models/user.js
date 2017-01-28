'use strict'
const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 10

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (user, options, done) {
        let noop = () => { }
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
          if (err) { return done(err) } 
          bcrypt.hash(user.password, salt, noop, (err, hashedpw) => {
            if (err) { return done(err) }
            user.password = hashedpw
            done()
          })
        })
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      checkPassword (guess) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(guess, this.password, (err, res) => {
            if (err) { reject(res) } 
            resolve(res)
          })
        })
      },
      sayHi () {
        return this.username
      }
    }
  });
  return User;
};
