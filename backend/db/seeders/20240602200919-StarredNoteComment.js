'use strict';
const {StarredNoteComment} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await StarredNoteComment.bulkCreate([
    {
      user_id: 1,
      starrednote_id: 1,
      comment: 'A useful and helpful note. Thanks for sharing...'
    },
    {
      user_id: 2,
      starrednote_id: 2,
      comment: 'Finally, found the solution I was looking for. Thanks.'
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Lessons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2]}
    }, {})
  }
};
