const { User } = require("../models");

const userData = [
  {
    username: "seedUser",
    email: "test@testing.com",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
