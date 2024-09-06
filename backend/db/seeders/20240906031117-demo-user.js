'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'sharif@tabeshnotes.org',
        username: 'Sharif',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'mohammadjan@tabeshnotes.org',
        username: 'Mohammadjan',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'alisina@tabeshnotes.org',
        username: 'Alisina',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};