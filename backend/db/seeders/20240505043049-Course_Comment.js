'use strict';

const { Course_Comment } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Course_Comment.bulkCreate([
      {
        user_id: 1,
        course_id: 1,
        comment: 'This is the best course available on planet earth.',
        stars: 5,
      },
      {
        user_id: 1,
        course_id: 2,
        comment: 'This is a single course sufficient to learn this technology',
        stars: 4,
      },
      {
        user_id: 2,
        course_id: 1,
        comment: 'Human beings needed this course.',
        stars: 3,
      },
      {
        user_id: 2,
        course_id: 2,
        comment: 'After going through like tens of courses, finally I got blessed finding this course. It is amazing. If you are passinate about learning this course, then do not miss it.',
        stars: 2,
      },
      {
        user_id: 1,
        course_id: 3,
        comment: 'After going through like tens of courses, finally I got blessed finding this course. It is amazing. If you are passinate about learning this course, then do not miss it.',
        stars: 5,
      }
    ], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Course_Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: [1, 2] }
    }, {});
  }
};
