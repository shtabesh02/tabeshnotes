'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompletedLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompletedLesson.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      CompletedLesson.belongsTo(models.Course, {
        foreignKey: 'course_id'
      });

      CompletedLesson.belongsTo(models.Lesson, {
        foreignKey: 'lesson_id'
      });
      
    }
  }
  CompletedLesson.init({
    user_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompletedLesson',
  });
  return CompletedLesson;
};