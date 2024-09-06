'use strict';

const { UserCourse } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await UserCourse.bulkCreate([
      {
        user_id: 1,
        course_id: 2,
      },
      {
        user_id: 1,
        course_id: 3,
      },
      {
        user_id: 2,
        course_id: 1,
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserCourses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      course_id: { [Op.in]: [2, 3] }
    }, {});
  }
};
