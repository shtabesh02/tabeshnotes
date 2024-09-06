'use strict';
const {StarredNote} = require('../models');
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
   await StarredNote.bulkCreate([
    {
      user_id: 1,
      title: 'index.js in functional componenets direcotry',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place.",
    },
    {
      user_id: 2,
      title: 'How to create a model',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place.",
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
    options.tableName = 'StarredNotes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2]}
    }, {})
  }
};
