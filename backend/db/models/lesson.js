'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Lesson.belongsTo(models.User, {
      //   foreignKey: 'user_id'
      // });

      Lesson.belongsTo(models.Course, {
        foreignKey: 'course_id'
      });

      Lesson.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Lesson.hasMany(models.CompletedLesson, {
        foreignKey: 'lesson_id',
        onDelete: 'CASCADE'
      })

    }
  }
  Lesson.init({
    course_id: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please provide a title for the course."
        }
      }

    },
    content: {
      type: DataTypes.TEXT, // Changed it from STRING to TEXT
      validate: {
        notEmpty: {
          msg: "Please provide the content of the lesson."
        }
      }

    },
    // completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};