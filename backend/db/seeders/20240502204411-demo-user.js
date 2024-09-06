'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('User: ', User)
    await User.bulkCreate([
      {
        firstName: 'Shir Hussain',
        lastName: 'Tabesh',
        email: 'shir@demo.io',
        username: 'shirhussain',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sharif',
        lastName: 'Rezaie',
        email: 'user1@demo.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Alisina',
        lastName: 'Danesh',
        email: 'user2@demo.io',
        username: 'alisina',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Mohammadjan',
        lastName: 'Farasu',
        email: 'user3@demo.io',
        username: 'mohammadjan',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['shirhussain','Demo-lition', 'alisina', 'mohammadjan'] }
    }, {});
  }
};



// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
